import React, {useState} from "react";
import {StyleSheet} from "react-native";
import {Text, TextInput, View} from "react-native-web";
import text from "react-native-web/dist/exports/Text";


export default function Main({navigation}) {
    const [task, setTask] = useState();



    const TaskList = () => {

    }


    return(

        <View style={styles.container}>
            <TextInput
                value={text}
                onChangeText={task => setTask(task)}
            />
            <Text style={styles.text}>{task}</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});