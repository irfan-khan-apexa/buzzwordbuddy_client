import { Platform } from 'react-native';

const baseUrl = () => {
    if (Platform.OS === 'android') {
        return 'http://192.168.1.5:3000/api/'; // 👈 Your computer's IP here
    }
    return 'http://localhost:3000/api/';
};
export default baseUrl;

