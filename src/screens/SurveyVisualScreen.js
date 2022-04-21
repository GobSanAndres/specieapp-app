import React from 'react';
import { View, Text } from 'react-native';
import { useSelector } from "react-redux";
import { metrics } from '../constants/metrics';
import { theme } from '../constants/theme';
import BaseScreen from './BaseScreen';
import { ScrollView } from 'react-native-gesture-handler';
import CardSurvey from '../components/CardSurvey';


const SurveyVisualScreen = (props) => {
    const { surveyName, data, origin } = props.route.params;
    const {idTheme} = useSelector(state => state);

    const goToSurvey = (item) => {
        props.navigation.navigate("FormScreen", { survey: item, origin });
    }

    const styles = getStyle(idTheme);
    
    return (
       <BaseScreen {...props} genericHeader isBack>
            <View style={styles.container}>
                <Text style={styles.title}>{ surveyName }</Text>
                
                <ScrollView>
                    {
                        data.length > 0 && (
                            data.map((item, i) => {
                                if(i%2 == 0)
                                    return(
                                        <CardSurvey
                                            bgColor={theme[idTheme].card1.backgroundColor}
                                            textColor={theme[idTheme].card1.textColor}
                                            survey={item}
                                            key={i.toString()}
                                            goSurvey={goToSurvey}
                                        />
                                    )
                                else
                                return(
                                    <CardSurvey
                                        bgColor={theme[idTheme].card2.backgroundColor}
                                        textColor={theme[idTheme].card2.textColor}
                                        survey={item}
                                        key={i.toString()}
                                        goSurvey={goToSurvey}
                                    />
                                )   
                            })
                        )
                    }
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

export default SurveyVisualScreen;