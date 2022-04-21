import React, { useState } from "react";
import { TextInput, View, Text } from "react-native";
import { useSelector } from "react-redux";
import Icon from 'react-native-vector-icons/Ionicons';
import { theme } from "../constants/theme";


const InputCustom = (props) => {
    const { icon, placeholder, value, setValue, messageError, validChange, isIcon, isPassword } = props;

    const [isFocus, setIsFocus] = useState(false);
    const [error, setError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { idTheme } = useSelector(state => state);

    const styles = getStyle(idTheme);

    const additionalStyle = {
        borderWith: (isFocus || error) ? 2 : 0,
        borderColor: error && value != "" ? theme[idTheme].inputError.borderColor : theme[idTheme].input.borderColor
    };

    const colorItemAditional = {
        color: error ? theme[idTheme].text.error : theme[idTheme].text.info
    };

    const onChange = (text) => {
        setValue(text);
        if(validChange != undefined)
            validate(text);
    }

    const validate = (text) => {
        if(validChange(text))
            setError(false);
        else
            setError(true);
    }

    return(
        <>
            <View style={{ ...styles.sectionSearch, ...additionalStyle }}>
                {
                    isIcon && (
                        <View style={{flex: 0.18, justifyContent: "center", alignItems: "center" }}>
                            <Icon color={theme[idTheme].button.backgroundColor} style={styles.icon} name={`${icon}`} size={20} />
                        </View>
                    )
                }

                <View style={{ flex: 0.82 }}>
                    {
                        value != "" && (
                            <Text style={{ ...styles.placeholder, ...colorItemAditional }}>{ placeholder }</Text>
                        )
                    }

                    <TextInput
                        {...props}
                        style={styles.input}
                        placeholder={placeholder}
                        onChangeText={onChange}
                        underlineColorAndroid="transparent"
                        value={value}
                        onFocus={()=>setIsFocus(true)}
                        onBlur={()=>setIsFocus(false)}
                        secureTextEntry={isPassword && !showPassword}
                    />
                </View>

                {
                    isPassword && (
                        <View style={{flex: 0.18, justifyContent: "center", alignItems: "center" }}>
                            <Icon 
                                style={styles.icon} 
                                name={showPassword ? 'eye-off' : 'eye'}
                                size={20}
                                color={theme[idTheme].button.backgroundColor} 
                                onPress={()=>setShowPassword(!showPassword)}
                            />

                        </View>
                        
                    )
                }
                   

            </View>
            {
                (error && !isFocus) && (
                    <Text style={{ ... styles.messageError, ...colorItemAditional }}>
                        { messageError }
                    </Text>
                )
            }
        </>
    )
}

export default InputCustom;

const getStyle = (key) => {

    return {
        sectionSearch: {
            flexDirection: 'row',
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme[key].input.backgroundColor,
            borderWidth: 2,
            borderRadius: 18,
            width: "100%",
            marginTop: 10,
            height: 60
        },
        icon: {
            height: 20,
            width: 20
        },
        input:{
            flex: 1,
            paddingBottom: 7,
            paddingLeft: 0,
            paddingRight: 5,
            color: theme[key].input.textColor,
            width: "100%",
            fontSize: 16
        },
        placeholder: {
            fontSize: 12,
            paddingTop: 3
        },
        messageError: {
            textAlign: "left",
            marginLeft: 15,
            marginTop: 8
        }
    }
}
