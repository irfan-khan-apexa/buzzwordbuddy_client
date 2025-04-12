import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { getDailyBuzzwords } from '../api/buzzwords';
import { getFeedbackForSentence } from '../api/buzzwords';

export default function SubmissionSuccessScreen() {
    const [feedbackList, setFeedbackList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadFeedback = async () => {
            try {
                const words = await getDailyBuzzwords();
                const storedSubmissions = await Promise.all(
                    words.map(async (word) => {
                        const response = await getFeedbackForSentence({
                            term: word.term,
                            sentence: `My sentence using the word '${word.term}' goes here...`, // ⚠️ replace with real sentence if tracked
                        });
                        return {
                            term: word.term,
                            feedback: response,
                        };
                    })
                );
                setFeedbackList(storedSubmissions);
                setLoading(false);
            } catch (err) {
                console.error('Feedback loading error:', err);
                setLoading(false);
            }
        };

        loadFeedback();
    }, []);

    return (
        <ScrollView contentContainerStyle={{ padding: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
                🎉 Submission Complete!
            </Text>

            {loading ? (
                <ActivityIndicator size="large" />
            ) : (
                feedbackList.map((item, index) => (
                    <View key={index} style={{ marginBottom: 20 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{item.term}</Text>
                        <Text style={{ color: '#666', marginTop: 5 }}>{item.feedback}</Text>
                    </View>
                ))
            )}
        </ScrollView>
    );
}
