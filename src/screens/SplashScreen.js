import React, { useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { setSurveyFishMiddleware } from "../middlewares/surveyFish/surveyFishMiddleware";
import { setIsLoadingMiddleware } from "../middlewares/isLoading/isLoadingMiddleware";
import { surveys } from "../constants/dataPrueba";

import BaseScreen from './BaseScreen';

var timerInit;

const SplashScreen = ({navigation}) => {
    const { user }  = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {
        initLoading();
        //loadLocalData();
        timerInit();
    }, []);

    const initLoading = () => {
        dispatch(setIsLoadingMiddleware(true));
    }

/*     const loadLocalData = () =>{
        dispatch(setSurveyFishMiddleware(surveys));
    } */

    const timerInit = () => {
        setTimeout(() => {
            initApp();
            dispatch(setIsLoadingMiddleware(false));
        }, 2000);
    }

    const initApp = () => {
        if(user.token)
            navigation.navigate("Home");
        else
            navigation.navigate("Login");
    }

    return (
       <BaseScreen>
                
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

export default SplashScreen;