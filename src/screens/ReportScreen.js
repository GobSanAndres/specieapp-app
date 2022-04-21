import React from 'react';
import { Text, View } from 'react-native';
import { useSelector } from "react-redux";

import { metrics } from '../constants/metrics';
import { theme } from '../constants/theme';
import BaseScreen from './BaseScreen';
import CardHome from '../components/CardHome';


const ReportScreen = (props) => {
    const { idTheme, localSurveyFish, surveyFish, surveyAgro, localSurveyAgro } = useSelector(state => state);
    
    const styles = getStyle(idTheme);

    return (
       <BaseScreen {...props} genericHeader isMenu>
            <View style={styles.container}>
                <Text style={styles.title}>Formatos en dispositivo</Text>
                <CardHome
                    {...props}
                    screen="LocalCategory"
                    params={{ title: "Información en dispositivo", survey: surveyFish, localSurvey: localSurveyFish, origin: "fish"}}
                    icon="fish"
                    colorIcon={theme[idTheme].module1.textColor}
                    title={"Información\nde Pesca"}
                    colorBg={{backgroundColor: theme[idTheme].module2.backgroundColor}}
                    colorText={{color: theme[idTheme].module2.textColor}}
                />

                <CardHome
                    {...props}
                    screen="LocalFormat"
                    params={ {title: "Información en dispositivo", survey: surveyAgro, localSurvey: localSurveyAgro, origin: "agro"} }
                    icon="seedling"
                    colorIcon={theme[idTheme].module1.textColor}
                    title={"Información\nde Agro"}
                    colorBg={{}}
                    colorText={{}}
                />
            </View>
       </BaseScreen>
    )
}

const getStyle = (key) => {
    return {
        container:{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1
        },
        textModule:{
            color: theme[key].module1.textColor,
            fontSize: metrics.screenWidth * 0.065,
            fontWeight: "700",
            textAlign: "center"
        },
        title:{
            textAlign: 'center',
            fontWeight: 'bold',
            color: theme[key].text.info,
            fontSize: metrics.screenWidth * 0.07,
            marginBottom: 30
        },
    }
}

export default ReportScreen;