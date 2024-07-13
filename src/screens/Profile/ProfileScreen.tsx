import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchProfile, logout, updateProfile } from '../../api';
import { RootNavigationList } from '../../navigation/RootNavigation/RootNavigator';

interface Profile {
  name: string;
  email: string;
  city: string;
  pincode: string;
  country: string;
}

const initForm: () => Profile = () => ({
  name: '',
  email: '',
  city: '',
  pincode: '',
  country: '',
})

export const ProfileScreen = () => {
  const [profile, setProfile] = useState<Profile|null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<Profile>(initForm());
  const navigation = useNavigation();

  const loadProfile = async () => {
    try {
      const data = await fetchProfile();
      setProfile(data);
      setForm(data);
    } catch (e) {
      console.error('Failed to fetch profile', e);
    }
  };

  const handleUpdate = async () => {
    try {
      const updatedProfile = await updateProfile(form);
      setProfile(updatedProfile);
      setIsEditing(false);
    } catch (e) {
      console.error('Failed to update profile', e);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (profile)
      setForm(profile);
  };

  const handleLogout = async () => {
    await logout()
    navigation.navigate(RootNavigationList.LOGIN);
  };

  useEffect(() => {
    loadProfile();
  }, []);

  if (!profile) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isEditing ? (
        <>
          <Text style={styles.title}>Edit Profile</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={form.name}
            onChangeText={(text) => setForm({ ...form, name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={form.email}
            onChangeText={(text) => setForm({ ...form, email: text })}
            // editable={false}
          />
          <TextInput
            style={styles.input}
            placeholder="City"
            value={form.city}
            onChangeText={(text) => setForm({ ...form, city: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Pincode"
            keyboardType="numeric"
            value={form?.pincode?.toString()}
            onChangeText={(text) => setForm({ ...form, pincode: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Country"
            value={form.country}
            onChangeText={(text) => setForm({ ...form, country: text })}
          />
          <View style={styles.buttonContainer}>
            <Button title="Save" onPress={handleUpdate} />
            <View style={styles.buttonSpacer} />
            <Button title="Cancel" onPress={handleCancel} />
          </View>
        </>
      ) : (
        <>
          <Text style={styles.title}>Profile</Text>
          <View style={styles.card}>
            <Text style={styles.label}>Name: {profile?.name}</Text>
            <Text style={styles.label}>Email: {profile?.email}</Text>
            <Text style={styles.label}>City: {profile?.city}</Text>
            <Text style={styles.label}>Pincode: {profile?.pincode}</Text>
            <Text style={styles.label}>Country: {profile?.country}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Edit Profile" onPress={() => setIsEditing(true)} />
            <View style={styles.buttonSpacer} />
            <Button title="Logout" onPress={handleLogout} />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    color: 'black',
  },
  label: {
    fontSize: 18,
    marginVertical: 4,
    color: 'black',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginVertical: 8,
    borderRadius: 4,
    width: '100%',
    backgroundColor: '#f0f0f0',
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  buttonSpacer: {
    width: 16,
  },
  card: {
    width: '100%',
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    marginBottom: 16,
  },
});
