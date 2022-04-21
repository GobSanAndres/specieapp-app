import React from 'react';
import { useSelector } from "react-redux";
import { KeyboardAvoidingView, ImageBackground } from 'react-native';
import { theme } from '../constants/theme';
import Header from '../components/Header';
import ModalCustom from '../components/ModalCustom';


const BaseScreen = (props) => {
    const { children, genericHeader, isBack, isMenu } = props;
    const { idTheme, isLoading } = useSelector(state => state);
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="heigth" keyboardVerticalOffset={1} enabled>
            <ImageBackground style={{flex: 1, height: "100%", width: "100%", backgroundColor: theme[idTheme].back.backgroundColor}}>
                {
                    genericHeader && (<Header {...props} isBack={isBack} isMenu={isMenu} />)
                }
                {children}
                {
                    isLoading && (
                        <ModalCustom />
                    )
                }
            </ImageBackground>
        </KeyboardAvoidingView>
       
    )
}


export default BaseScreen;