import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, ScrollView, Text, Alert } from 'react-native';
import { getDailyBuzzwords, submitSentence } from '../api/buzzwords';
import BuzzwordCard from '../components/BuzzwordCard';

export default function DailyBuzzwordsScreen({ navigation }) {
    const [buzzwords, setBuzzwords] = useState([]);
    const [inputs, setInputs] = useState({});

    useEffect(() => {
        getDailyBuzzwords().then(setBuzzwords);
    }, []);

    const handleChange = (termId, text) => {
        setInputs(prev => ({ ...prev, [termId]: text }));
    };

    const handleSubmit = async () => {
        try {
            for (const word of buzzwords) {
                const text = inputs[word.id];
                if (text) {
                    await submitSentence({ term_id: word.id, user_sentence: text });
                }
            }
            navigation.navigate('Success');
        } catch (err) {
            Alert.alert('Error', 'Failed to submit');
        }
    };
    const allFilled = buzzwords.every(word => inputs[word.id] && inputs[word.id].trim().length > 6);
    const today = new Date().toLocaleDateString(undefined, {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
    });
    return (

        <ScrollView contentContainerStyle={{ padding: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
                Today's Buzzwords – {today}
            </Text>
            <Button title="View All Submissions" onPress={() => navigation.navigate('AllSubmissions')} />


            {buzzwords.map(word => (
                <View key={word.id}>
                    <BuzzwordCard
                        term={word.term}
                        meaning={word.meaning}
                        example={word.example_sentence}
                    />
                    <TextInput
                        placeholder="Your sentence..."
                        style={{
                            borderWidth: 1,
                            borderColor: '#ccc',
                            padding: 10,
                            borderRadius: 8,
                            marginBottom: 20,
                        }}
                        value={inputs[word.id] || ''}
                        onChangeText={text => handleChange(word.id, text)}
                    />
                    {/* ✅ SUCCESS CHECK MARK */}
                    {inputs[word.id] && inputs[word.id].trim().length > 10 && (
                        <Text style={{ color: 'green', marginTop: 5 }}>✅ Ready</Text>
                    )}
                </View>
            ))}
            <Button
                title="Submit All"
                onPress={handleSubmit}
                disabled={!allFilled}
            />
        </ScrollView>
    );
}
