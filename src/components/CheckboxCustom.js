import React, { useState, useEffect } from "react";
import { View, Text } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { Divider } from 'react-native-paper';
import { theme } from "../constants/theme";
import { useSelector } from "react-redux";
import { getColorTextArray, updateArray } from "../utils/validate";

const CheckboxCustom = (props) => {
    const { items, description, form, setForm, info, intentSend, section } = props;
    const { duplicate } = section;
    const index = info.index != undefined ? info.index : 0;

    const {idTheme} = useSelector(state => state);

    const [checked, setChecked] = useState({});

    const colorText = getColorTextArray({theme, idTheme, intentSend, info, duplicate, form, section, index});
    
    useEffect(() => {
        fillState();
        
    }, [])

    const handleCheck = (item) => {
        let array =  duplicate ? form[section.nameQuestion][index][info.nameQuestion] : form[info.nameQuestion];
        if(checked[item.idData]){
            setChecked({...checked, [item.idData]: false})
            const filterArray = array.filter(element => element != item.idData);
            if(duplicate){
                const newArray = updateArray(form[section.nameQuestion], filterArray, form, section, index, info, duplicate);
                setForm({...form, [section.nameQuestion]: newArray}); 

            }else{
                setForm({...form, [info.nameQuestion]: filterArray})    
            }
        }else{
            setChecked({...checked, [item.idData]: true})
            
            array.push(item.idData)
            if(duplicate){
                const newArray = updateArray(form[section.nameQuestion], array, form, section, index, info, duplicate);
                setForm({...form, [section.nameQuestion]: newArray}); 
            }else
                setForm({...form, [info.nameQuestion]: array})
        }
            
        
    }

    const fillState = () => {
        const arrayQuestion = duplicate ? form[section.nameQuestion][index][info.nameQuestion] : form[info.nameQuestion];
        
        if(arrayQuestion.length > 0){
            let obj = {};
            arrayQuestion.forEach(element => {
                obj = { ...obj, [element.toString()]: true}
            });
            setChecked(obj);
        }
    }

    const styles = getStyle(idTheme);


    return(
        <>
            <View style={styles.contain}>
                <Text style={{...styles.description, color: colorText}}>{ description } { info.required && " *"}</Text>
                
                    {
                    items != undefined && (
                        items.map((item, i) => (
                            <View key={i.toString()} style={styles.containCheckbox}>
                                <Checkbox.Item
                                    uncheckedColor={theme[idTheme].text.info } 
                                    style={{paddingVertical: 0, paddingHorizontal: 0}} 
                                    status={checked[item.idData] ? "checked" : "unchecked"} color={theme[idTheme].text.info}
                                    onPress={()=>handleCheck(item)}
                                />
                                <Text style={styles.descriptionCheckbox}>
                                    {item.descriptionData}
                                </Text>
                            </View>
                        ))
                    )
                    }
            
            </View>
            <Divider style={styles.divider} />
        </>
  )
}

 const getStyle = (key) => {
     return {
        contain: {
            paddingHorizontal: 15, 
            paddingVertical: 5
        },
        description: {
            color: theme[key].text.info, 
            fontWeight: "700", fontSize: 14
        },
        containCheckbox: {
            flexDirection: "row", 
            alignItems: "center"
        },
        descriptionCheckbox: {
            color: theme[key].text.info, 
            fontSize: 12
        },
        divider: {
            borderColor: theme[key].accordion.backgroundColor, 
            borderWidth: 1
        }
     }
 }

export default CheckboxCustom;