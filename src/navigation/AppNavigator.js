import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import DailyBuzzwordsScreen from '../screens/DailyBuzzwordsScreen';
import SubmissionSuccessScreen from '../screens/SubmissionSuccessScreen';
import ReviewAllScreen from '../screens/ReviewAllScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Daily" component={DailyBuzzwordsScreen} />
                <Stack.Screen name="Success" component={SubmissionSuccessScreen} />
                <Stack.Screen name="AllSubmissions" component={ReviewAllScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
