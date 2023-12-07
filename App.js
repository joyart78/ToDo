import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TodoListScreen from './components/TodoListScreen';
import TodoActionsScreen from './components/TodoActionsScreen';

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="TodoActionsScreen">
                <Stack.Screen name="Todo"
                              component={TodoListScreen}
                    />
                <Stack.Screen name="TodoActions" component={TodoActionsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
