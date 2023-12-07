import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Text, TouchableOpacity } from 'react-native';
import TodoActionsScreen from './TodoActionsScreen';
// import TodoListScreen from 'TodoListScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'todos';

const Main = ({navigation}) => {
    const [todos, setTodos] = useState([]);
    // const [modalVisible, setModalVisible] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState(null);

    useEffect(() => {
        loadTodos();
    }, []);

    const toggleModal = () => {
        setModalVisible(!modalVisible);
        setSelectedTodo(null);
    };

    const loadTodos = async () => {
        try {
            const storedTodos = await AsyncStorage.getItem(STORAGE_KEY);
            setTodos(storedTodos ? JSON.parse(storedTodos) : []);
        } catch (error) {
            console.error('Error loading todos:', error);
        }
    };

    const saveTodos = async (updatedTodos) => {
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTodos));
        } catch (error) {
            console.error('Error saving todos:', error);
        }
    };

    const addTodo = (text) => {
        const newTodo = { id: Date.now(), text };
        const updatedTodos = [...todos, newTodo];
        setTodos(updatedTodos);
        saveTodos(updatedTodos);
        toggleModal();
    };

    const editTodo = (id, newText) => {
        const updatedTodos = todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo));
        setTodos(updatedTodos);
        saveTodos(updatedTodos);
        toggleModal();
    };

    const deleteTodo = (id) => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
        saveTodos(updatedTodos);
    };

    const handleEdit = (todo) => {
        setSelectedTodo(todo);
        setModalVisible(true);
    };

    return (
        <View style={styles.container}>

                <TouchableOpacity onPress={() => navigation.navigation('Form')}>
                    <Text> Добавить</Text>
                </TouchableOpacity>

            {/*<Button title="Добавить задачу" onPress={() => navigat.navigation('Form')} />*/}
            {/*<TodoListScreen*/}
            {/*    visible={modalVisible}*/}
            {/*    toggleModal={toggleModal}*/}
            {/*    addTodo={addTodo}*/}
            {/*    editTodo={selectedTodo ? (text) => editTodo(selectedTodo.id, text) : null}*/}
            {/*    todoToEdit={selectedTodo}*/}
            {/*/>*/}
            <TodoActionsScreen todos={todos} editTodo={handleEdit} deleteTodo={deleteTodo} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
});

export default Main;
