import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Text, View } from "react-native";
import { RadioButton } from "react-native-paper";
import { metrics } from "../constants/metrics";
import { theme } from "../constants/theme";
import { colorPrimary, colorSecond } from "../constants/colors";
import OptionTheme from "./OptionTheme";
import ButtonCustom from "./ButtonCustom";
import { setIdThemeMiddleware } from "../middlewares/idTheme/idThemeMiddleware";



const ModalTheme = (props) => {
    const { isLoading, setIsLoading } = props;
    const { idTheme } = useSelector(state => state);
    const [changeTheme, setChangeTheme] = useState(idTheme);
    const dispatch = useDispatch();

    const styles = getStyle(idTheme);

    const handle = () => {
        dispatch(setIdThemeMiddleware(changeTheme));
        setIsLoading(false);
    }

    return(
        <View>
            <Modal
                animationType="slide"
                transparent
                visible={isLoading}
            >
                <View style={styles.container}>
                    <View style={styles.containerModal}>
                        <Text style={styles.text}>Temas disponibles</Text>

                        <RadioButton.Group onValueChange={newValue => setChangeTheme(newValue)} value={changeTheme}>
                            <OptionTheme
                                color={theme.primary.text.info}
                                principalColor={colorPrimary}
                                title="Principal"
                                value="primary"
                            />

                            <OptionTheme
                                color={theme.second.text.info}
                                principalColor={colorSecond}
                                title="Secundario"
                                value="second"
                            />
                            
                        </RadioButton.Group>
                        <View style={{flexDirection: "row", justifyContent: "space-around", marginTop: 12}}>
                            <ButtonCustom
                                label="Cancelar"
                                color={theme[idTheme].button.backgroundColor}
                                styleButton={styles.buttonCancel}
                                onClick={()=>setIsLoading(false)}
                            />
                            <ButtonCustom
                                label="Aceptar"
                                styleButton={styles.buttonAcept}
                                onClick={handle}
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
            justifyContent: "center", 
            alignItems: "center",
            height: metrics.screenHeigth,
            width: metrics.screenWidth,
            backgroundColor: "backgroundColor: rgba(1,1,1,0.5)"
        },
        text: {
            color: theme[key].text.info, 
            fontWeight: "700", 
            fontSize: 14, 
            marginTop: 6,
            textAlign: "center",
            marginBottom: 6
        },
        containerModal: {
            width: metrics.screenWidth * 0.8, 
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
        }
    }
}

export default ModalTheme;