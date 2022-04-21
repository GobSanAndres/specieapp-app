import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { CommonActions } from "@react-navigation/native";
import AccordionCustom from '../components/AccordionCustom';
import ButtonCustom from '../components/ButtonCustom';
import { metrics } from '../constants/metrics';
import { theme } from '../constants/theme';
import { getKeys } from '../utils/transformData';
import { validDataJson } from '../utils/validate';
import { setIsLoadingMiddleware } from '../middlewares/isLoading/isLoadingMiddleware';
import { setLocalSurveyFishMiddleware } from "../middlewares/localSurveyFish/localSurveyFishMiddleware";
import { setLocalSurveyAgroMiddleware } from "../middlewares/localSurveyAgro/localSurveyAgroMiddleware";
import { setIdInternMiddleware } from "../middlewares/idIntern/idInternMiddleware";
import AlertGeneric from "../utils/AlertGeneric";

import BaseScreen from './BaseScreen';
import { postService } from '../services';
import { endPoint } from '../config';


const FormScreen = (props) => {
    const { survey, dataLocal, origin } = props.route.params;
    const formJson = getKeys(survey);
    const [formState, setFormState] = useState(formJson);
    const [isOpenAcordion, setIsOpenAcordion] = useState(false);
    const [intentSend, setIntentSend] = useState(false);
    const [disableButton, setDisableButton] = useState(false);
    const { idTheme, isNetwork, localSurveyFish, user, localSurveyAgro, idIntern } = useSelector(state => state);
    const dispatch = useDispatch();
    
    const styles = getStyle(idTheme);
    
    /* console.log("=========")
    console.log(formState.weight_check_specie);
    console.log("=========") */

    const sytleNetwork = {
        backgroundColor: isNetwork ? theme.primary.button.backgroundColor : theme.primary.button.secondBgColor
    }

    const getLocalData = () => {
        if(dataLocal != undefined) setFormState(dataLocal);
    }

    useEffect(() => {
        getLocalData();
    }, [])

    const handleSend = () => {
        setIntentSend(true);
        setDisableButton(false);
        dispatch(setIsLoadingMiddleware(true));
        
        if(validDataJson(formState)){
            dispatch(setIsLoadingMiddleware(false));
            if(isNetwork){
                //mostrar mensaje y hacer goBack
                //AlertGeneric = (title, message, text, cancelable, action, textCancel, actionCancel)
                AlertGeneric("Información", 
                    "¿Está seguro que desea enviar la información?", 
                    "Aceptar", 
                    true, 
                    sendInfo,
                    "Cancelar",
                    null
                )
            }else{
                AlertGeneric("Información", 
                    "¿Está seguro que guardar localmente la información?", 
                    "Aceptar", 
                    true, 
                    saveLocal,
                    "Cancelar",
                    null
                )
            }
            
            //mostrar message
        }else{
            dispatch(setIsLoadingMiddleware(false));
            AlertGeneric("Advertencia", "Debe completar todos los campos marcados como obligatorios", "OK", true, null);
        }
        
    }

    const sendInfo = () => {
        //dispatch(setIsLoadingMiddleware(true));
        dispatch(setIsLoadingMiddleware(true));

        const object = {
            ...formState,
            create_by: user.user.id,
            issue_date: new Date().valueOf()
        }

       /*  console.log("object sendInfo ");
        console.log(object);
        console.log("======= end object sendInfo ========"); */
        
        postService(endPoint.saveData, object)
        .then(resp => {
            /* console.log("response service ");
            console.log(resp);
            console.log("======="); */
            dispatch(setIsLoadingMiddleware(false));
            if(resp.success){
                
                if(formState.idintern){
                    var arrayLocal = [];
                    let localData = localSurveyFish;
                    if(origin == "agro") localData = localSurveyAgro;
                    arrayLocal = localData.filter(item => item.idintern != formState.idintern);
                    if(origin == "fish")
                        dispatch(setLocalSurveyFishMiddleware(arrayLocal));
                    else
                        dispatch(setLocalSurveyAgroMiddleware(arrayLocal));
                }
                AlertGeneric("Información", resp.message, "OK", true, null);
                resetNavigation();
            }else
                AlertGeneric("Error", "¡Ups ha sucedido un error, intente nuevamente en unos minutos!", "OK", true, null);
            
            setDisableButton(false);
            
            
        })
        .catch(error => {
            setDisableButton(false);
            dispatch(setIsLoadingMiddleware(false));
            AlertGeneric("Error", "¡Ups ha sucedido un error, intente nuevamente en unos minutos!", "OK", true, null);
            console.log("error ", error);
        })
        
        
    }

    const saveLocal = () => {
        var arrayLocal = [];
        let localData = localSurveyFish;
        if(origin == "agro") localData = localSurveyAgro;
        
        if(formState.idintern){
            arrayLocal = localData.filter(item => item.idintern != formState.idintern);
            arrayLocal.push(formState);
        }else{
            arrayLocal = [...localData];
            arrayLocal.push({...formState, idintern: idIntern});
            dispatch(setIdInternMiddleware(idIntern + 1));
        }
        dispatch(setIsLoadingMiddleware(true));
        if(origin == "fish")
            dispatch(setLocalSurveyFishMiddleware(arrayLocal));
        else
            dispatch(setLocalSurveyAgroMiddleware(arrayLocal));
        

        temporizador();
    }

    const resetNavigation = () => {
        props.navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [ { name: "Home"}]
            })
        )
    }

    const temporizador = () => {
        setTimeout(() => {
            dispatch(setIsLoadingMiddleware(false));
            resetNavigation();
        }, 2000);
    }

    //console.log("forms ", formState);

    return (
        <BaseScreen {...props} genericHeader isBack>
            <ScrollView style={{marginVertical: 10}}>
                <View style={styles.container}>
                    <Text style={styles.title}>{ survey.nameSurvey }</Text>
                    <AccordionCustom 
                        encuestas={survey} 
                        formState={formState}
                        setFormState={setFormState}
                        setIsOpenAcordion={setIsOpenAcordion}
                        intentSend={intentSend}
                    />
                </View>
            </ScrollView>
            {
                !isOpenAcordion &&(
                    <View style={styles.containButton}>
                        <ButtonCustom
                            label={ isNetwork ? "Enviar" : "Guardar en local" }
                            fontSize={16}
                            color={isNetwork ? theme.primary.button.textColor : theme.primary.button.secondeTxColor}
                            styleButton={{...styles.button, ...sytleNetwork, width: metrics.screenWidth * 0.6}}
                            onClick={handleSend}
                            disable={disableButton}
                        />   
                    </View>
                )
            }
       </BaseScreen>
       
    )
}

const getStyle = (key) => {
    return {
        container:{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1
        },
        title:{
            textAlign: 'center',
            fontWeight: 'bold',
            color: theme[key].text.info,
            fontSize: 18,
            marginVertical: metrics.screenHeigth * 0.02,
            paddingHorizontal: 20
        },
        containButton: { 
            height: 45, 
            flexDirection: "row", 
            justifyContent: "center",
            alignItems: "flex-end", 
            width: metrics.screenWidth * 0.9,
            marginBottom: 30,
            alignSelf: "center"
        },
        button: {
            width: metrics.screenWidth * 0.4, 
            height: 40, 
            marginTop: 7,
            justifyContent: "center"
        }
    }
}

export default FormScreen;

