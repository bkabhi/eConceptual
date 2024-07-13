import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
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
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<Profile>(initForm());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigation = useNavigation();

  const loadProfile = async () => {
    try {
      const data = await fetchProfile();
      setProfile(data);
      setForm(data);
    } catch (e) {
      Alert.alert('Error', 'Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    setSaving(true);
    try {
      const updatedProfile = await updateProfile(form);
      setProfile(updatedProfile);
      setIsEditing(false);
      Alert.alert('Success', 'Profile updated successfully');
    } catch (e) {
      Alert.alert('Error', 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (profile)
      setForm(profile);
  };

  const handleLogout = async () => {
    await logout();
    navigation.navigate(RootNavigationList.LOGIN);
  };

  useEffect(() => {
    loadProfile();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
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
            placeholderTextColor="#888"
            value={form.name}
            onChangeText={(text) => setForm({ ...form, name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#888"
            value={form.email}
            onChangeText={(text) => setForm({ ...form, email: text })}
            // editable={false}
          />
          <TextInput
            style={styles.input}
            placeholder="City"
            placeholderTextColor="#888"
            value={form.city}
            onChangeText={(text) => setForm({ ...form, city: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Pincode"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={form.pincode.toString()}
            onChangeText={(text) => setForm({ ...form, pincode: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Country"
            placeholderTextColor="#888"
            value={form.country}
            onChangeText={(text) => setForm({ ...form, country: text })}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleUpdate} disabled={saving}>
              <Text style={styles.buttonText}>{saving ? 'Saving...' : 'Save'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
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
            <TouchableOpacity style={styles.button} onPress={() => setIsEditing(true)}>
              <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
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
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    marginBottom: 24,
    color: '#333',
  },
  label: {
    fontSize: 18,
    marginVertical: 4,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
    width: '100%',
    backgroundColor: '#fff',
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    width: '100%',
  },
  button: {
    flex: 1,
    padding: 15,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#6c757d',
    marginLeft: 10,
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  card: {
    width: '100%',
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
});
