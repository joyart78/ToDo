import React from "react";
import {createStackNavigator} from "@react-navigation/stack"
import {NavigationContainer} from "@react-navigation/native"
import Main from "./components/Main.js";
import NewTask from "./components/NewTask.js"



const Stack = createStackNavigator();

export default function Navigate() {
    return(
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen
                name="Main"
                component={Main}
                options={
                {
                    title: "Главная",
                    headerStyle: {backgroundColor: '#454546', height: 90},
                    headerTitleStyle: {fontWeight: 'light', color: 'white', textAlign: 'center'},
                }
            }
            />
            <Stack.Screen
                name="Add ToDo"
                component={NewTask}
            />

        </Stack.Navigator>
    </NavigationContainer>
    );
}