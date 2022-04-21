import React from 'react';
import { View, Text, ToastAndroid } from 'react-native';
import { useSelector } from "react-redux";

import { metrics } from '../constants/metrics';
import { theme } from '../constants/theme';
import Icon from "react-native-vector-icons/FontAwesome5";
import { TouchableOpacity } from 'react-native-gesture-handler';


const CardHome = (props) => {
    const { screen, params, icon, colorIcon, title, colorBg, colorText } = props;
    const { idTheme } = useSelector(state => state);
        
    const styles = getStyle(idTheme);

    return (
        <TouchableOpacity 
            style={styles.container}
            onPress={()=>{
                props.navigation.navigate(screen, params)
            }}
        >
        <View style={{...styles.containModule, ...colorBg }}>
            <Icon
                name={icon}
                color={colorIcon}
                size={metrics.screenHeigth * 0.1}
                style={{alignSelf: "center"}}
            />
            <Text style={{...styles.textModule, ...colorText}}>{ title }</Text>
        </View>
    </TouchableOpacity>
    )
}

const getStyle = (key) => {
    return {
        container:{
            alignItems: 'center',
        },
        containModule:{
            width: "90%",
            height: metrics.screenHeigth * 0.2,
            backgroundColor: theme[key].module1.backgroundColor,
            borderRadius: 12,
            flexDirection: "row",
            padding: 15,
            justifyContent: "space-around",
            alignItems: "center",
            marginBottom: 25
        },
        textModule:{
            color: theme[key].module1.textColor,
            fontSize: metrics.screenWidth * 0.065,
            fontWeight: "700",
            textAlign: "center"
        }
    }
}

export default CardHome;