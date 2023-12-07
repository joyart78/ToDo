import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button,TouchableOpacity, StyleSheet,Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Touchable} from "react-native-web";

const TodoListScreen = ({ navigation }) => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        loadTodos();
    }, []);

    const loadTodos = async () => {
        try {
            const storedTodos = await AsyncStorage.getItem('todos');
            setTodos(storedTodos ? JSON.parse(storedTodos) : []);
        } catch (error) {
            console.error('Error loading todos:', error);
        }
    };

    const navigateToActions = (todo) => {
        navigation.navigate('TodoActions', { todo, updateTodos: loadTodos });
    };

    return (
        <View style={{flex: 1,}}>
            <FlatList
                data={todos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.taskContainer}>
                        <TouchableOpacity onPress={() => navigateToActions(item)}>
                            <Text style={styles.text} >{item.text}</Text>
                        </TouchableOpacity>

                        {/*<Button title="Действия" onPress={() => navigateToActions(item)} />*/}
                    </View>
                )}
            />
            <TouchableOpacity onPress={() => navigation.navigate('TodoActions', { updateTodos: loadTodos })}
                              style={styles.ImaContainer}>
                <Image source={require('../assets/circle_create_expand_icon.png')}
                       style={styles.image}/>
            </TouchableOpacity>
            {/*<Button title="Добавить задачу" onPress={() => navigation.navigate('TodoActions', { updateTodos: loadTodos })} />*/}
        </View>
    );
};

export default TodoListScreen;

const styles = StyleSheet.create({
    taskContainer: {
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        marginBottom: 10,
        borderRadius: 5,

    },
    text: {
        fontSize: 16,
        color: 'black',
    },
    ImaContainer: {
        position: 'absolute',
        bottom: 20, // отступ от нижнего края
        right: 20, // отступ от правого края
    },
    image: {
        width: 60,
        height: 60,
    },


});