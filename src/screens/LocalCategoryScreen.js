import React from 'react';
import { View, Text } from 'react-native';
import { useSelector } from "react-redux";
import { metrics } from '../constants/metrics';
import { theme } from '../constants/theme';
import BaseScreen from './BaseScreen';
import { ScrollView } from 'react-native-gesture-handler';
import CardSurvey from '../components/CardSurvey';
import AlertGeneric from '../utils/AlertGeneric';


const LocalCategoryScreen = (props) => {
    const { title, origin } = props.route.params;
    const {idTheme, surveyFish, localSurveyFish} = useSelector(state => state);

    
    

    const goToSurveyArtesanal = () => {
        const formArtesanal = localSurveyFish.filter(item=>item.category == "Artesanal");
        const survey = surveyFish.filter(item=>item.category == "Artesanal");
        if(formArtesanal.length > 0)
            props.navigation.navigate("LocalFormat", { title: "Información en dispositivo", survey, localSurvey: formArtesanal, origin});
        else
            AlertGeneric("Información", "¡Para este tipo de formato no hay data registrada!", "Cerrar", true, null);
    }

    const goToSurveyIndustry = () => {
        const formIndustrial = localSurveyFish.filter(item=>item.category == "Industrial");
        const survey = surveyFish.filter(item=>item.category == "Industrial");
        if(formIndustrial.length > 0)
            props.navigation.navigate("LocalFormat", {title: "Información en dispositivo", survey, localSurvey: formIndustrial, origin});
        else
            AlertGeneric("Información", "¡Para este tipo de formato no hay data registrada!", "Cerrar", true, null);
    }

    const styles = getStyle(idTheme);
    
    return (
       <BaseScreen {...props} genericHeader isBack>
            <View style={styles.container}>
                <Text style={styles.title}>{ title }</Text>
                
                <ScrollView>
                    <CardSurvey
                        bgColor={theme[idTheme].card1.backgroundColor}
                        textColor={theme[idTheme].card1.textColor}
                        key="artesanal"
                        goSurvey={goToSurveyArtesanal}
                        title="Pesca Artesanal"
                        icon="praying-hands"
                    />
                    <CardSurvey
                        bgColor={theme[idTheme].card2.backgroundColor}
                        textColor={theme[idTheme].card2.textColor}
                        key="industrial"
                        goSurvey={goToSurveyIndustry}
                        title="Pesca Industrial"
                        icon="industry"
                    />
                </ScrollView>
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
        title:{
            textAlign: 'center',
            fontWeight: 'bold',
            color: theme[key].text.info,
            fontSize: metrics.screenWidth * 0.055,
            marginVertical: metrics.screenHeigth * 0.08,
            paddingHorizontal: 20
            
        }
        
    }
}

export default LocalCategoryScreen;