import AsyncStorage from '@react-native-async-storage/async-storage';
import api, { getHeaders } from './apiConfig';

export const login = async (email: string, password: string) => {
    const response = await api.post('/login', { email, password });
    const token = response.data.token;
    AsyncStorage.setItem('token', token);
    return token;
};

export const logout = async () => {
    await AsyncStorage.removeItem('token');
};

export const fetchProfile = async () => {
    const headers = await getHeaders();
    const response = await api.get('/profile', { headers });
    return response.data;
};

export const updateProfile = async (profileData: any) => {
    const headers = await getHeaders();
    const response = await api.post('/profile', profileData, { headers });
    return response.data;
};

