import React from 'react';
import { View, Text, Button } from 'react-native';

export default function SubmissionSuccessScreen({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 22, marginBottom: 20 }}>🎉 Submitted Successfully!</Text>
            <Button title="Back to Daily Words" onPress={() => navigation.navigate('Daily')} />
        </View>
    );
}
