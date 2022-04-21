import React from 'react';
import { View, Text } from 'react-native';
import { useSelector } from "react-redux";
import { metrics } from '../constants/metrics';
import { theme } from '../constants/theme';
import BaseScreen from './BaseScreen';
import { ScrollView } from 'react-native-gesture-handler';
import CardSurvey from '../components/CardSurvey';
import AlertGeneric from '../utils/AlertGeneric';


const LocalFormatScreen = (props) => {
    const { title, survey, localSurvey, origin } = props.route.params;
    const {idTheme } = useSelector(state => state);

    const goToLocalScreen = (item) => {
        const data = localSurvey.filter(element => element.nameSurvey == item.nameSurvey);
        console.log("dataleng ", data.length);
        if(data.length > 0)
            props.navigation.navigate("Local", { data, title: item.nameSurvey, origin });
        else
            AlertGeneric("Información", "¡Para este tipo de formato no hay data registrada!", "Cerrar", true, null);
        
    }

    const styles = getStyle(idTheme);
    
    return (
       <BaseScreen {...props} genericHeader isBack>
            <View style={styles.container}>
                <Text style={styles.title}>{ title }</Text>
                
                <ScrollView>
                    {
                        survey.length > 0 && (
                            survey.map((item, i) => {
                                if(i%2 == 0)
                                    return(
                                        <CardSurvey
                                            bgColor={theme[idTheme].card1.backgroundColor}
                                            textColor={theme[idTheme].card1.textColor}
                                            survey={item}
                                            key={i.toString()}
                                            goSurvey={goToLocalScreen}
                                        />
                                    )
                                else
                                return(
                                    <CardSurvey
                                        bgColor={theme[idTheme].card2.backgroundColor}
                                        textColor={theme[idTheme].card2.textColor}
                                        survey={item}
                                        key={i.toString()}
                                        goSurvey={goToLocalScreen}
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
            fontSize: 18,
            marginVertical: metrics.screenHeigth * 0.08
            
        }
        
    }
}

export default LocalFormatScreen;