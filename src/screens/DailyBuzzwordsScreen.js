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

    return (
        <ScrollView contentContainerStyle={{ padding: 20 }}>
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
                </View>
            ))}
            <Button title="Submit All" onPress={handleSubmit} />
        </ScrollView>
    );
}
