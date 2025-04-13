import { Platform } from 'react-native';

const baseUrl = () => {
    if (Platform.OS === 'android') {
        return 'http://192.168.1.4:3000/api/';
    }
    return 'http://localhost:3000/api/';
};
export default baseUrl;

