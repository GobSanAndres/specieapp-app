import React from "react";
import { useSelector } from "react-redux";
import { Modal, Text, View, ActivityIndicator } from "react-native";
import { metrics } from "../constants/metrics";
import { theme } from "../constants/theme";


const ModalCustom = () => {
    const { isLoading, idTheme } = useSelector(state => state)

    const styles = getStyle(idTheme);

    return(
        <View>
            <Modal
                animationType="slide"
                transparent
                visible={isLoading}
            >
                <View style={styles.container}>
                    <ActivityIndicator size="large" color={theme[idTheme].loading.component} />
                    <Text style={styles.text}>
                        Cargando...
                    </Text>
                </View>
            </Modal>
        </View>
    )
}

const getStyle = (key) => {
    return {
        container: {
            justifyContent: "center", 
            alignItems: "center",
            height: metrics.screenHeigth,
            width: metrics.screenWidth,
            backgroundColor: "backgroundColor: rgba(1,1,1,0.5)"
        },
        text: {
            color: theme[key].loading.component, 
            fontWeight: "700", 
            fontSize: 18, 
            marginTop: 10
        }
    }
}

export default ModalCustom;