import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { login } from '../../api/authApi';
import { useNavigation } from '@react-navigation/native';
// import { useAuth } from '../context/AuthContext';

type LoginScreenProps = {
  navigateToProfile(): void;
};

export const LoginScreen = (props: LoginScreenProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { navigateToProfile } = props;

  const navigation = useNavigation<any>();

  useEffect(()=>{
    navigation.addEve
  },[])

  const handleLogin = async () => {
    try {
      console.log(email, password, "ooodoodood")
      const token = await login(email, password);
      console.log(token, "token 15");
      // Alert.alert("Login successful", token)
      // setToken(token);
      navigateToProfile();
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  title: { fontSize: 24, marginBottom: 24 },
  input: { borderWidth: 1, padding: 8, marginVertical: 8, borderRadius: 4 },
  error: { color: 'red' },
});