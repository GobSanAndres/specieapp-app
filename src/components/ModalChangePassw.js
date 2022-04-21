import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Text, View, ToastAndroid } from "react-native";
import { metrics } from "../constants/metrics";
import { theme } from "../constants/theme";
import ButtonCustom from "./ButtonCustom";
import { CommonActions } from "@react-navigation/native";
import InputCustom from "./InputCustom";
import AlertGeneric from "../utils/AlertGeneric";
import { setIsLoadingMiddleware } from "../middlewares/isLoading/isLoadingMiddleware";
import { postService } from "../services";
import { endPoint } from "../config";
import { setUserMiddleware } from "../middlewares/user/userMiddleware";

const ModalChangePassword = (props) => {
    const { isLoad, setIsLoad, navigation } = props;
    const { idTheme, isLoading, user } = useSelector(state => state);
    const [actualPassw, setActualPassw] = useState("");
    const [newPassw, setNewPassw] = useState("");
    const [newPassw2, setNewPassw2] = useState("");
    const [isReady, setIsReady] = useState(false);
    const dispatch = useDispatch();

    const styles = getStyle(idTheme);

    const handleChange = () => {
        setIsLoad(false)
        
        if(isReady){
            if(actualPassw == newPassw){
                AlertGeneric("Advertencia", "La nueva contraseña debe ser diferente a la actual", "OK", true, null);
            }else{
                const data = { email: user.user.email, currentPassword: actualPassw, newPassword: newPassw }
                dispatch(setIsLoadingMiddleware(true));
                postService(endPoint.changePassword, data)
                .then(respJson => {
                    
                    if(respJson.success){
                        ToastAndroid.show("¡Proceso de cambio de contraseña exitoso!", ToastAndroid.LONG, ToastAndroid.BOTTOM);
                        resetNavigation();
                    }else{
                        dispatch(setIsLoadingMiddleware(false));
                        AlertGeneric("Error", respJson.message, "OK", true, null);
                    }
                })
                .catch(error => {
                    AlertGeneric("Error", "¡Ups ha sucedido un error, intente nuevamente en unos minutos!", "Aceptar", true, null);
                    dispatch(setIsLoadingMiddleware(false));
                    console.log(error);
                })
            }
        }else{
            AlertGeneric("Advertencia", "Debe completar toda la información", "OK", true, null);
        }
    }

    const validChange = (text) => {
        let resp = true;
        if(newPassw != text)
            resp = false;
        
        if(resp && actualPassw != "")
            setIsReady(true);

        return resp;
    }

    const resetNavigation = () => {
        dispatch(setUserMiddleware({ token: null }));
        
        dispatch(setIsLoadingMiddleware(false));
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [ { name: "Splash"}]
            })
        )

        
    }

    const cancelChange = () => setIsLoad(false);

    return(
        <View>
            <Modal
                animationType="slide"
                transparent
                visible={isLoad}
            >
                <View style={styles.container}>
                    <View style={styles.containerModal}>
                        <Text style={styles.text}>Cambio de contraseña</Text>
                        <InputCustom
                            icon="ios-key-sharp"
                            placeholder="Contraseña actual"
                            value={actualPassw}
                            setValue={setActualPassw}
                            messageError={"Contraseña invalida"}
                            isIcon={true}
                            isPassword={true}
                        />
                        <InputCustom
                            icon="ios-key-sharp"
                            placeholder="Nueva contraseña"
                            value={newPassw}
                            setValue={setNewPassw}
                            messageError={"Contraseña invalida"}
                            isIcon={true}
                            isPassword={true}
                        />
                        <InputCustom
                            icon="ios-key-sharp"
                            placeholder="Repetir nueva contraseña"
                            value={newPassw2}
                            setValue={setNewPassw2}
                            messageError={"Las contraseñas no coinciden"}
                            isIcon={true}
                            isPassword={true}
                            validChange={validChange}
                        />
                        <View style={{flexDirection: "row-reverse"}}>
                            <ButtonCustom
                                label="Aceptar"
                                styleButton={{...styles.button, flex: 1, marginLeft: 5}}
                                fontSize={15}
                                onClick={handleChange}
                                isLoad={isLoading}
                                disable={!isReady}
                            />
                            <ButtonCustom
                                label="Cancelar"
                                styleButton={{...styles.button, backgroundColor: "red", flex: 1, marginRight: 5}}
                                fontSize={15}
                                onClick={cancelChange}
                                
                               
                            />
                        </View>
                         
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const getStyle = (key) => {
    return {
        container: {
            justifyContent: "flex-start", 
            alignItems: "center",
            height: metrics.screenHeigth,
            width: metrics.screenWidth,
            backgroundColor: "backgroundColor: rgba(1,1,1,0.5)",
            paddingTop: 60
        },
        text: {
            color: theme[key].text.info, 
            fontWeight: "700", 
            fontSize: 20, 
            marginTop: 6,
            textAlign: "center",
            marginBottom: 6
        },
        containerModal: {
            width: metrics.screenWidth * 0.9, 
            padding: 15, 
            backgroundColor: "white",
            borderRadius: 8
        },
        containRadio: {
            flexDirection: "row", 
            alignItems: "center"
        },
        option: {
            fontWeight: "700", 
            fontSize: 12
        },
        buttonCancel: {
            width: metrics.screenWidth * 0.3, 
            height: 30, 
            backgroundColor: "transparent",
            borderColor: theme[key].button.borderColor,
            marginTop: 7,
            borderWidth: 1,
            paddingHorizontal: 5
        },
        buttonAcept: {
            width: metrics.screenWidth * 0.3, 
            height: 30, 
            backgroundColor: theme[key].button.backgroundColor,
            marginTop: 7,
            borderWidth: 1,
            paddingHorizontal: 5
        },
        button: { 
            marginTop: 20, 
            height: 40
        }
    }
}

export default ModalChangePassword;