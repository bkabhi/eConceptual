// apiConfig.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_URL = 'https://econceptual-interview-mock.vercel.app/api';

export const getToken = async () => await AsyncStorage.getItem('token');

export const getHeaders = async () => {
    const token = await getToken();
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
}

const api = axios.create({
    baseURL: API_URL,
});

export default api;