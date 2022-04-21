import React, {useState} from 'react';
import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native';
import { useSelector } from 'react-redux';
import { Divider } from 'react-native-paper';
import BaseScreen from './BaseScreen';
import { theme } from '../constants/theme';
import Icon from "react-native-vector-icons/FontAwesome5";
import { metrics } from '../constants/metrics';
import ModalTheme from "../components/ModalTheme";
import ModalChangePassword from '../components/ModalChangePassw';



const ConfigurationScreen = (props) => {
    const [isLoadTheme, setIsLoadTheme] = useState(false);
    const [isLoadPassw, setIsLoadPassw] = useState(false);
    const { idTheme } = useSelector(state => state);
    
    const styles = getStyle(idTheme);

    const showToast = () => {
        ToastAndroid.show("Funcionalidad no disponible", ToastAndroid.LONG, ToastAndroid.BOTTOM);
    }

    return (
        <BaseScreen {...props} genericHeader isMenu isBack>
           <View style={styles.container}>
                <Text style={styles.title}>Ajustes</Text>
                <TouchableOpacity onPress={()=>setIsLoadTheme(true)} style={{flexDirection: "row", paddingHorizontal: 30, paddingVertical: 10, alignItems: "center"}}>
                    <Icon
                        name="adjust"
                        color={theme[idTheme].text.info}
                        size={metrics.screenHeigth * 0.04}
                        style={{alignSelf: "center"}}
                    />
                    <Text style={styles.text}>Configuración de tema</Text>
                </TouchableOpacity>
                <Divider style={styles.divider} />
                <TouchableOpacity onPress={()=>setIsLoadPassw(true)}>
                    <View style={{flexDirection: "row", paddingHorizontal: 30, paddingVertical: 10, alignItems: "center"}}>
                        <Icon
                            name="key"
                            color={theme[idTheme].text.info}
                            size={metrics.screenHeigth * 0.04}
                            style={{alignSelf: "center"}}
                        />
                        <Text style={styles.text}>Cambio de contraseña</Text>
                    </View>
                </TouchableOpacity>
                <Divider style={styles.divider} />
               <ModalTheme isLoading={isLoadTheme} setIsLoading={setIsLoadTheme} />
               <ModalChangePassword isLoad={isLoadPassw} setIsLoad={setIsLoadPassw} navigation={props.navigation} />
            </View>
       </BaseScreen>   
    )
}

const getStyle = (key) => {
    return {
        container:{
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            flex: 1,
            paddingVertical: metrics.screenHeigth * 0.05
        },
        title:{
            textAlign: 'center',
            fontWeight: 'bold',
            color: theme[key].text.info,
            fontSize: 18,
            alignSelf: "center",
            marginBottom: 15
        },
        text:{
            color: theme[key].text.info,
            fontSize: metrics.screenWidth * 0.04,
            fontWeight: "400",
            textAlign: "center",
            marginLeft: 20
        },
        divider: {
            borderColor: theme[key].tab.noActive, 
            borderWidth: 0.3,
            width: "90%",
            alignSelf: "center",
            marginVertical: 10
        }
    }
}

export default ConfigurationScreen;