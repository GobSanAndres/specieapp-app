import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import { setSurveyFishMiddleware } from "../middlewares/surveyFish/surveyFishMiddleware";
import { surveys } from "../constants/dataPrueba";

import BaseScreen from './BaseScreen';

const fecha = new Date().valueOf()

const TestScreen = (props) => {
    const [passw, setPassw] = useState("TextScreen 1");
    const dispatch = useDispatch();
   

    const handle = () => {

       dispatch(setSurveyFishMiddleware(surveys));
    }

    const clean = () => {
        dispatch(setSurveyFishMiddleware([]));
    }

    const [date, setDate] = useState(new Date().valueOf());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event) => {
        const date =new Date(event.nativeEvent.timestamp).valueOf();
        console.log(new Date(date).getHours());
        console.log("======= ", date);
        /* const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        console.log(currentDate); */
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    
    return (
        <BaseScreen {...props} genericHeader isMenu>
            <View style={styles.container}>
                <Text style={styles.title}>Test</Text>

                <Button title="Save formatos" onPress={handle} />

                <Button title="Limpiar data" onPress={clean} />

                <View>
                    <Button onPress={showDatepicker} title="Show date picker!" />
                </View>
                <View>
                    <Button onPress={showTimepicker} title="Show time picker!" />
                </View>
                {show && (
                    <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                    />
                )}

                
            </View>
       </BaseScreen>
       
    )
}

const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    title:{
        textAlign: 'center',
        fontWeight: 'bold'
    }
})

export default TestScreen;