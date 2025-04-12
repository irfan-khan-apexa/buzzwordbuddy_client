import axios from 'axios';
import baseUrl from '../helper/BaseUrl'

const API_BASE = `${baseUrl()}terms`;


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
export const fetchDailySentences = async (date) => {
    const response = await axios.get(`${API_BASE}/all/user-sentences?date=${date}`);
    return response.data;

};

export const getFeedbackForSentence = async ({ term, sentence }) => {
    const response = await axios.post(`${API_BASE}/feedback`, {
        term,
        sentence,
    });
    return response.data.feedback;
};





