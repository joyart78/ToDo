import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TodoActionsScreen = ({ route, navigation }) => {
    const [text, setText] = useState('');
    const [todo, setTodo] = useState(null);

    useEffect(() => {
        if (route.params?.todo) {
            setTodo(route.params.todo);
            setText(route.params.todo.text);
        }
    }, [route.params?.todo]);

    const saveTodo = async () => {
        if (todo) {
            const updatedTodo = { ...todo, text };
            await updateTodoInStorage(updatedTodo);
        } else {
            const newTodo = { id: Date.now(), text };
            await saveTodoToStorage(newTodo);
        }
        route.params?.updateTodos?.();
        navigation.goBack();
    };

    const deleteTodo = async () => {
        await deleteTodoFromStorage();
        route.params?.updateTodos?.();
        navigation.goBack();
    };

    const updateTodoInStorage = async (updatedTodo) => {
        try {
            const storedTodos = await AsyncStorage.getItem('todos');
            const todos = storedTodos ? JSON.parse(storedTodos) : [];
            const updatedTodos = todos.map((t) => (t.id === updatedTodo.id ? updatedTodo : t));
            await AsyncStorage.setItem('todos', JSON.stringify(updatedTodos));
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    const saveTodoToStorage = async (newTodo) => {
        try {
            const storedTodos = await AsyncStorage.getItem('todos');
            const todos = storedTodos ? JSON.parse(storedTodos) : [];
            const updatedTodos = [...todos, newTodo];
            await AsyncStorage.setItem('todos', JSON.stringify(updatedTodos));
        } catch (error) {
            console.error('Error saving todo:', error);
        }
    };

    const deleteTodoFromStorage = async () => {
        try {
            const storedTodos = await AsyncStorage.getItem('todos');
            const todos = storedTodos ? JSON.parse(storedTodos) : [];
            const updatedTodos = todos.filter((t) => t.id !== todo.id);
            await AsyncStorage.setItem('todos', JSON.stringify(updatedTodos));
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Введите задачу"
                value={text}
                onChangeText={(value) => setText(value)}
            />
            <TouchableOpacity onPress={saveTodo} style={styles.buttonSave}>
                <Text style={styles.buttonText}>Сохранить</Text>
            </TouchableOpacity>
            {todo && (
                <TouchableOpacity onPress={deleteTodo} style={styles.buttonDelete}>
                    <Text style={styles.buttonText}>Удалить</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default TodoActionsScreen;

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    buttonSave: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    buttonDelete: {
        backgroundColor: '#FF5722',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
})