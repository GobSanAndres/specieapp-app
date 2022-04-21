import React, {useState} from "react";
import { View, Text, ScrollView, Image } from "react-native"; 
import { useSelector } from "react-redux";
import { theme } from "../constants/theme";
import { metrics } from "../constants/metrics";
import BaseScreen from "./BaseScreen";
import { getDataTable, getKeyTable } from "../utils/validate";
import { DataTable } from 'react-native-paper';
import ButtonCustom from "../components/ButtonCustom";


const LocalScreen = (props) => {
    const { data, title, origin } = props.route.params;
    //console.log("title ", title, data);
    const { idTheme, surveyFish, surveyAgro } = useSelector(state => state);
    
    const styles = getStyle(idTheme);

    const dataHead = getKeyTable(data[0]);
    
    const dataBody = getDataTable(data);
    
    const goToFormat = (index) => {
        let survey = surveyFish.filter(item => item.idFormulario == data[0].idFormulario);
        if(origin == "agro")
            surveyAgro.filter(item => item.idFormulario == data[0].idFormulario);
        const dataLocal = data[index];
        props.navigation.navigate("FormScreen", { survey: survey[0], dataLocal, origin})
    }

    

    return (
       <BaseScreen {...props} genericHeader isBack>
            <View style={styles.container}>
            <Text style={styles.title}>{ title }</Text>

            <ScrollView horizontal={true}>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title style={{width: 150}}>
                            Enviar
                        </DataTable.Title>
                        {
                            dataHead.map((item, i) => (
                                <DataTable.Title key={i.toString()} style={{width: 150}}>
                                    { item }
                                </DataTable.Title>
                            ))
                        }
                            
                    </DataTable.Header>
                    {
                        dataBody.map((item, i) => (
                            <DataTable.Row style={{height: 60}} key={i.toString()}>
                                <DataTable.Cell style={{width: 150, height: 60}}>
                                <ButtonCustom
                                    label="Ver"
                                    styleButton={{
                                        width: 80, 
                                        height: 30, 
                                        backgroundColor: theme[idTheme].button.backgroundColor,
                                        
                                    }}
                                    onClick={()=>goToFormat(i)}
                                />  
                                </DataTable.Cell>
                                {
                                    item.map((element, elem)=>{
                                        if(element.type == "string")
                                            return (
                                                <DataTable.Cell style={{width: 150, height: 60}} key={elem}>{element.value}</DataTable.Cell>
                                            )
                                        else
                                            return (
                                                <DataTable.Cell style={{width: 150, height: 60}} key={elem}>
                                                    <View>
                                                        <Image
                                                            source={{ uri: element.value}}
                                                            style={{width: 40, height: 40}}
                                                        />
                                                    </View>
                                                </DataTable.Cell>
                                            )
                                    })
                                }
                            </DataTable.Row>
                        ))
                    }
                    


                    {/* <DataTable.Pagination
                        page={page}
                        numberOfPages={dataBody.length / 6}
                        onPageChange={(page) => setPage(page)}
                        label="1-2 of 6"
                        optionsPerPage={optionsPerPage}
                        itemsPerPage={2}
                        setItemsPerPage={setItemsPerPage}
                        showFastPagination
                        optionsLabel={'Rows per page'}
                    /> */}
                </DataTable>
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

export default LocalScreen;