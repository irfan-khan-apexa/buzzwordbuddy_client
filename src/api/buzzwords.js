import axios from 'axios';

const API_BASE = 'http://localhost:3000/api/terms';

export const getDailyBuzzwords = async () => {
    const response = await axios.get(`${API_BASE}/daily`);
    return response.data;
};

export const submitSentence = async ({ term_id, user_sentence }) => {
    const response = await axios.post(`${API_BASE}/use`, {
        term_id,
        user_sentence,
    });
    return response.data;
};
