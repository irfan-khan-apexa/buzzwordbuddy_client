import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function BuzzwordCard({ term, meaning, example }) {
    return (
        <View style={styles.card}>
            <Text style={styles.term}>{term}</Text>
            <Text style={styles.meaning}>{meaning}</Text>
            {example && <Text style={styles.example}>Example: {example}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        padding: 14,
        borderRadius: 10,
        marginBottom: 12,
        elevation: 3,
    },
    term: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    meaning: {
        marginTop: 5,
        fontSize: 14,
    },
    example: {
        marginTop: 5,
        fontStyle: 'italic',
        color: '#555',
    },
});
