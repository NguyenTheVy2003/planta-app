
import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import Login from './screen/Login';
import Register from './screen/Register';
import Home from '../Screen/Home';

const UserNavigation = (props) => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='Register' component={Register} />
        </Stack.Navigator>
    )
}

export default UserNavigation

