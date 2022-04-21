import React, {useEffect} from 'react';
import { View, BackHandler } from 'react-native';
import { useSelector, useDispatch } from "react-redux";

import { metrics } from '../constants/metrics';
import { theme } from '../constants/theme';
import BaseScreen from './BaseScreen';
import CardHome from '../components/CardHome';
import { getService } from '../services';
import { endPoint } from '../config';
import { setSurveyFishMiddleware } from "../middlewares/surveyFish/surveyFishMiddleware";
import { setIsLoadingMiddleware } from "../middlewares/isLoading/isLoadingMiddleware";
import { setSurveyAgroMiddleware } from "../middlewares/surveyAgro/surveyAgroMiddleware";


const HomeScreen = (props) => {
    const { idTheme, surveyFish, isNetwork, surveyAgro } = useSelector(state => state);
    const dispatch = useDispatch();

    const styles = getStyle(idTheme);

    useEffect(() => {
        getData();
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            () => {
              return true;
            }
        );

        return()=>{
            backHandler.remove();
        }
        
    }, [])

    const getData = () => {
        if(isNetwork){
            dispatch(setIsLoadingMiddleware(true));
            getService(endPoint.getData)
            .then(respJson => {
                if(respJson.modules.length > 0){
                    
                    const moduleFish = respJson.modules.filter(item=>item.nameModule == "Pescadería")[0];
                    const moduleAgro = respJson.modules.filter(item=>item.nameModule == "Agropecuario")[0];
                    if(moduleFish)
                        dispatch(setSurveyFishMiddleware(moduleFish.forms));
                    if(moduleAgro)
                        dispatch(setSurveyAgroMiddleware(moduleAgro.forms));
                }
                dispatch(setIsLoadingMiddleware(false));
            })
            .catch(error => {
                dispatch(setIsLoadingMiddleware(false));
                console.log("error ", error);
            })
        }
    }

    

    return (
       <BaseScreen {...props} genericHeader isMenu>
            <View style={styles.container}>
                <CardHome
                    {...props}
                    screen="FishCategory"
                    params={ {surveyName: "FORMATOS DEL MÓDULO DE PESCA", data: surveyFish, origin: "fish"} }
                    icon="fish"
                    colorIcon={theme[idTheme].module1.textColor}
                    title={"Módulo \n de Pesca"}
                    colorBg={{}}
                    colorText={{}}
                />

                <CardHome
                    {...props}
                    screen="SurveyVisual"
                    params={ {surveyName: "FORMATOS DEL MÓDULO DE AGRO", data: surveyAgro, origin: "agro"} }
                    icon="seedling"
                    colorIcon={theme[idTheme].module1.textColor}
                    title={"Módulo \n de Agro"}
                    colorBg={{backgroundColor: theme[idTheme].module2.backgroundColor}}
                    colorText={{color: theme[idTheme].module2.textColor}}
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
        }
    }
}

export default HomeScreen;