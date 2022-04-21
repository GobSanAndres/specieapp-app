import React from "react";
import { View, BackHandler } from "react-native";
import { useDispatch } from "react-redux";
import { CommonActions } from "@react-navigation/native";
import {DrawerContentScrollView} from '@react-navigation/drawer';
import { Drawer } from "react-native-paper";
import AlertGeneric from "../utils/AlertGeneric";
import { setUserMiddleware } from "../middlewares/user/userMiddleware";
import { setIsLoadingMiddleware } from "../middlewares/isLoading/isLoadingMiddleware";

const SideMenu = (props) => {
    const { navigation } = props;
    const dispatch = useDispatch();

    const closeSession = () => {
        AlertGeneric("Información", 
            "¿Está seguro que desea cerrar sesión?", 
            "Aceptar", 
            true, 
            resetNavigation,
            "Cancelar",
            null
        )
    }

    const resetNavigation = () => {
        dispatch(setUserMiddleware({ token: null }));
        dispatch(setIsLoadingMiddleware(true));

        setTimeout(() => {
            dispatch(setIsLoadingMiddleware(false));
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [ { name: "Splash"}]
                })
            )
        }, 2000);

        
    }

    const exitApp = () => {
        BackHandler.exitApp();
    }

    return(
        <DrawerContentScrollView>
            <View style={{paddingVertical: 20, paddingHorizontal: 10}}>
                <Drawer.Section>
                    <Drawer.Item
                        label="Ajustes"
                        onPress={()=>{
                            props.navigation.navigate("Configuration")
                        }}
                    />
                    
                </Drawer.Section>
                
                <Drawer.Section>
                   <Drawer.Item
                        label="Cerrar sesión"
                        onPress={closeSession}
                    />
                </Drawer.Section>
                <Drawer.Section>
                   <Drawer.Item
                        label="Salir"
                        onPress={exitApp}
                    />
                </Drawer.Section>

            </View>
        </DrawerContentScrollView>
    )
}

export default SideMenu;



