import React from 'react';
import { View, Text } from 'react-native';
import { useSelector } from "react-redux";
import { metrics } from '../constants/metrics';
import { theme } from '../constants/theme';
import BaseScreen from './BaseScreen';
import { ScrollView } from 'react-native-gesture-handler';
import CardSurvey from '../components/CardSurvey';


const FishCategoryScreen = (props) => {
    const { surveyName, data, origin } = props.route.params;
    const {idTheme} = useSelector(state => state);

    const formArtesanal = data.filter(item=>item.category == "Artesanal");
    const formIndustrial = data.filter(item=>item.category == "Industrial");

    const goToSurveyArtesanal = () => {
        props.navigation.navigate("SurveyVisual", { surveyName: "Formatos de Pesca Artesanal", data: formArtesanal, origin });
    }

    const goToSurveyIndustry = () => {
        props.navigation.navigate("SurveyVisual", { surveyName: "Formatos de Pesca Industrial", data: formIndustrial, origin });
    }

    const styles = getStyle(idTheme);
    
    return (
       <BaseScreen {...props} genericHeader isBack>
            <View style={styles.container}>
                <Text style={styles.title}>{ surveyName }</Text>
                
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

export default FishCategoryScreen;