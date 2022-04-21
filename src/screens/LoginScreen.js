import React, { useState } from 'react';
import { View, Text, Image, StatusBar } from 'react-native';
import { useSelector, useDispatch } from "react-redux";

import ButtonCustom from '../components/ButtonCustom';
import InputCustom from '../components/InputCustom';
import { endPoint } from '../config';
import { theme } from '../constants/theme';
import { postService } from '../services';
import { validateEmail, validJson } from '../utils/validate';
import BaseScreen from './BaseScreen';
import AlertGeneric from '../utils/AlertGeneric';
import { setUserMiddleware } from "../middlewares/user/userMiddleware";
import { setIsLoadingMiddleware } from "../middlewares/isLoading/isLoadingMiddleware";
import { metrics } from '../constants/metrics';


const LoginScreen = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { idTheme, isLoading } = useSelector(state => state);
    const dispatch = useDispatch();

    const handle = () => {
        
        const data = { email, password }

        if(validJson(data) && validateEmail(email)){
            dispatch(setIsLoadingMiddleware(true));
            postService(endPoint.login, data)
            .then(respJson => {
                dispatch(setIsLoadingMiddleware(false));
                if(respJson.success){
                    dispatch(setUserMiddleware({ token: respJson.token, user: respJson.user }));
                    props.navigation.navigate("Home")
                }else
                    AlertGeneric("Error", respJson.message, "OK", true, null);
            })
            .catch(error => {
                AlertGeneric("Error", "¡Ups ha sucedido un error, intente nuevamente en unos minutos!", "Aceptar", true, null);
                dispatch(setIsLoadingMiddleware(false));
                console.log(error);
            })
        }else{
            AlertGeneric("Advertencia", "Debe ingresar email y contraseña", "OK", true, null);
        }

        
    }

    const styles = getStyle(idTheme);

    return (
        <BaseScreen>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true}/>
             <View style={styles.container}>
                 <Image
                    source={theme[idTheme].imgLogin.img}
                    style={styles.img}
                 />
                <Text style={styles.title}>Iniciar sesión</Text>
                <InputCustom
                        icon="person-circle-outline"
                        placeholder="Ingresa tu email"
                        value={email}
                        setValue={setEmail}
                        messageError={"Correo invalido"}
                        validChange={validateEmail}
                        isIcon={true}
                        isPassword={false}
                />
                <InputCustom
                        icon="ios-key-sharp"
                        placeholder="Ingresa tu contraseña"
                        value={password}
                        setValue={setPassword}
                        messageError={"Contraseña invalida"}
                        isIcon={true}
                        isPassword={true}
                />
                <ButtonCustom
                    label="Ingresar"
                    styleButton={styles.button}
                    fontSize={20}
                    onClick={handle}
                    isLoad={isLoading}
                />
                
            </View>
        </BaseScreen>
       
    )
}

const getStyle = (key) => {
    return {
        container:{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            paddingHorizontal: 20,
            paddingTop: metrics.screenHeigth * 0.3
        },
        title:{
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 20,
            marginBottom: 20,
            color: theme[key].text.info
        },
        button: { 
            marginTop: 20, 
            width: "100%", 
            height: 40
        },
        img: {
            width: metrics.screenWidth, 
            height: metrics.screenWidth * 0.9,
            position: "absolute",
            top: 0
        }
    }
}

export default LoginScreen;