import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { useSelector } from "react-redux";
import { theme } from "../constants/theme";

const ButtonCustom = (props) => {
    const { label, styleButton, fontSize, onClick, disable, isLoad, color } = props;
    const { idTheme } = useSelector(state => state);
    const styles = getStyle(idTheme);

    return (
        <TouchableOpacity disabled={disable} {...props} onPress={onClick} style={{...styles.button, ...styleButton}}>
                    {
                        isLoad && (
                            <ActivityIndicator style={{marginRight: 20}} size="small" color={theme[idTheme].button.textColor} />
                        )
                    }
                    <Text style={{...styles.title, fontSize, color: color ? color : theme[idTheme].button.textColor}}>{label}</Text>
        </TouchableOpacity>
    );
}

const getStyle = (key) => {
    return{
        title: {
            textAlign: "center",
            fontWeight: "700",
            fontSize: 15
        },
        button:{
            backgroundColor: theme[key].button.backgroundColor,
            paddingHorizontal: 25,
            borderRadius: 10,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: 4
        }
    }
}

export default ButtonCustom;