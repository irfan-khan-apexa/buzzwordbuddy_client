import React from 'react';
import { View, Text, ScrollView } from 'react-native';

export default function SubmissionSuccessScreen({ route }) {
    const { feedbackList } = route.params;

    return (
        <ScrollView contentContainerStyle={{ padding: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
                🎉 Submission Complete!
            </Text>

            {feedbackList.map((item, index) => {
                const ratingMatch = item.feedback.match(/Rating:\s*(\d)/);
                const rating = ratingMatch ? parseInt(ratingMatch[1]) : null;

                return (
                    <View key={index} style={{ marginBottom: 20, padding: 15, backgroundColor: '#f9f9f9', borderRadius: 10 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>🔤 {item.term}</Text>
                        {item.sentence && (
                            <Text style={{ fontStyle: 'italic', color: '#333' }}>"{item.sentence}"</Text>
                        )}
                        <Text style={{ marginTop: 10, color: '#444' }}>{item.feedback}</Text>
                        {rating && <Text style={{ marginTop: 5 }}>⭐️ Rating: {rating}/5</Text>}
                    </View>
                );
            })}
        </ScrollView>
    );
}
