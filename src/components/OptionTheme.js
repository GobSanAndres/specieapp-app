import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { RadioButton } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome5";
import { arrayColor } from "../constants/colors";


const OptionTheme = (props) => {
    const { color, principalColor, title, value } = props;

    return(
        <View style={styles.containRadio}>
            <RadioButton value={value} color={color} />
            <Text style={{ ...styles.option, color}}>
                { title }
            </Text>
            {
                arrayColor.map((item, i) => (
                    <Icon
                        name="circle"
                        color={principalColor[item]}
                        size={14}
                        style={styles.icon}
                        solid
                        key={i.toString()}
                    />
                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    containRadio: {
        flexDirection: "row", 
        alignItems: "center"
    },
    option: {
        fontWeight: "700", 
        fontSize: 12,
        marginLeft: 5,
        marginRight: 10
    },
    icon: {
        alignSelf: "center", 
        marginHorizontal: 4
    }
})

export default OptionTheme;