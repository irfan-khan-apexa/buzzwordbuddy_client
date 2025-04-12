import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    ActivityIndicator,
    Button,
    Platform,
    TextInput,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { fetchDailySentences } from '../api/buzzwords';

export default function ReviewAllScreen() {
    const [sentences, setSentences] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [showPicker, setShowPicker] = useState(false);

    const handleDateChange = (event, date) => {
        setShowPicker(Platform.OS === 'ios');
        if (date) {
            const formatted = date.toISOString().split('T')[0];
            setSelectedDate(formatted);
            fetchSentences(formatted);
        }
    };

    const handleWebDateChange = (event) => {
        const formatted = event.target.value;
        setSelectedDate(formatted);
        fetchSentences(formatted);
    };
    const fetchSentences = async (date) => {
        setLoading(true);
        try {
            const data = await fetchDailySentences(date);
            setSentences(data);
        } catch (err) {
            console.error('Error loading sentences:', err);
        }
        setLoading(false);
    };

    return (
        <ScrollView contentContainerStyle={{ padding: 20 }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 20 }}>
                📅 Select a Date to View Submissions
            </Text>

            {Platform.OS === 'web' ? (
                <input
                    type="date"
                    value={selectedDate || ''}
                    onChange={handleWebDateChange}
                    style={{
                        fontSize: 16,
                        padding: 8,
                        marginBottom: 20,
                        borderRadius: 4,
                        border: '1px solid #ccc',
                    }}
                />
            ) : (
                <>
                    <Button title="Pick a Date" onPress={() => setShowPicker(true)} />
                    {showPicker && (
                        <DateTimePicker
                            mode="date"
                            value={selectedDate ? new Date(selectedDate) : new Date()}
                            display="default"
                            onChange={handleDateChange}
                        />
                    )}
                </>
            )}

            {loading && <ActivityIndicator size="large" style={{ marginTop: 20 }} />}

            {!loading && selectedDate && (
                <>
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            marginVertical: 20,
                            color: '#007AFF',
                        }}
                    >
                        Submissions for {selectedDate}
                    </Text>

                    {sentences.length === 0 ? (
                        <Text style={{ fontStyle: 'italic', color: '#999' }}>
                            No submissions for this date.
                        </Text>
                    ) : (
                        sentences.map((s, idx) => (
                            <View key={idx} style={{ marginBottom: 15 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                                    {s.Buzzword?.term}
                                </Text>
                                <Text style={{ fontSize: 14, marginBottom: 3 }}>{s.user_sentence}</Text>
                                <Text style={{ fontSize: 12, color: '#999' }}>
                                    {new Date(s.created_at).toLocaleString()}
                                </Text>
                            </View>
                        ))
                    )}
                </>
            )}
        </ScrollView>
    );
}
