import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { metrics } from '../constants/metrics';
import Icon from "react-native-vector-icons/FontAwesome5"



const CardSurvey = (props) => {
    const { bgColor, textColor, survey, goSurvey, icon, title } = props;
    return(
        <TouchableOpacity 
            style={{alignItems: "center"}}
            onPress={()=>goSurvey(survey)}
        >
            <View style={{ ...styles.containSurvey, backgroundColor: bgColor }}>
                <Icon
                    name={icon != undefined ? icon : "check-square"}
                    color={textColor}
                    size={metrics.screenHeigth * 0.05}
                    style={{alignSelf: "center"}}
                />
                <Text style={{ ...styles.textSurvey, color: textColor }}>{ title != undefined ? title :  survey.nameSurvey }</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    containSurvey:{
        width: metrics.screenWidth * 0.9,
        height: metrics.screenHeigth * 0.1,
        borderRadius: 10,
        flexDirection: "row",
        paddingVertical: 8,
        paddingHorizontal: 20,
        alignItems: "center",
        marginBottom: 10
    },
    textSurvey:{
        fontSize: metrics.screenWidth * 0.037,
        fontWeight: "700",
        textAlign: "center",
        marginLeft: metrics.screenWidth * 0.06,
        paddingHorizontal: 25
    }
    
})

export default CardSurvey;