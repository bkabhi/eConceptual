import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { login } from '../../api/authApi';

type LoginScreenProps = {
  navigateToProfile(): void;
};

export const LoginScreen = (props: LoginScreenProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { navigateToProfile } = props;

  const handleLogin = async () => {
    try {
      await login(email, password);
      navigateToProfile();
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#C0C0C0" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#C0C0C0" value={password} onChangeText={setPassword} secureTextEntry />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {/* <Button title="Login" onPress={handleLogin} /> */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  title: { fontSize: 24, marginBottom: 24, color: '#000', },
  input: { borderWidth: 1, padding: 8, marginVertical: 8, borderRadius: 4, backgroundColor: '#f0f0f0', color: '#000',  },
  error: { color: 'red' },
  button: {
    padding: 15,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});