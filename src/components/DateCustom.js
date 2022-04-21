import React, { useState } from "react";
import { View, Text, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-paper';
import { useSelector } from "react-redux";
import DateTimePicker from '@react-native-community/datetimepicker';
import { theme } from "../constants/theme";
import { getColorText, updateArray } from "../utils/validate";

const getDate = (date, type) => {
    let tempDate = type == "date" ? `dd/mm/aaaa` : `hh:mm`;
        
    if(date){
        const dataDate = new Date(date);
        const year = dataDate.getFullYear();
        const month = dataDate.getMonth() + 1;
        const day = dataDate.getDate();
        let hour = dataDate.getHours();
        let minute = dataDate.getMinutes();
        hour = hour < 10 ? `0${hour}` : hour;
        minute = minute < 10 ? `0${minute}` : minute;
        
        tempDate = type == "date" ? `${day}/${month}/${year}` : `${hour}:${minute}`;
    }

    return tempDate;
}


const DateCustom = (props) => {
    const { description, form, setForm, info, intentSend, section } = props;
    const { duplicate } = section;
    const index = info.index != undefined ? info.index : 0;

    const {idTheme} = useSelector(state => state);
    const [showDate, setShowDate] = useState(false);
    const [dateSelect, setDateSelect] = useState(getDate(duplicate ? form[section.nameQuestion][index][info.nameQuestion] : form[info.nameQuestion], info.widget_type));

    const getValue = () => {
        let respForm;
        if(duplicate && form[section.nameQuestion][index][info.nameQuestion])
            respForm = form[section.nameQuestion][index][info.nameQuestion];
        else if(form[info.nameQuestion])
            respForm = form[info.nameQuestion]
        else
            respForm = new Date(new Date().valueOf());
        
        return respForm;
    }

    const [value, setValue] = useState(getValue());
    //console.log(info);
    const colorText = getColorText({ theme, idTheme, duplicate, form, index, info, intentSend, section });

    const onChange = (event) => {
        const date =new Date(event.nativeEvent.timestamp).valueOf();
        setShowDate(false);
        setDateSelect(getDate(date, info.widget_type));

        if(duplicate){
            const newArray = updateArray(form[section.nameQuestion], date, form, section, index, info, duplicate);
            setForm({...form, [section.nameQuestion]: newArray});
        }else
            setForm({...form, [info.nameQuestion]: date})
        
    }

    const styles = getStyle(idTheme);

    
    return(
        <>
        <View style={styles.container}>
            <TouchableOpacity
                onPress={()=>setShowDate(true)}   
                style={{flexDirection: "row"}}         
            >
                <Text style={{...styles.description, color: colorText}}>
                    { description } { info.required && " *" }
                </Text>
                <Text>
                    { dateSelect }
                </Text>
            </TouchableOpacity>
            
            {showDate && (
                    <DateTimePicker
                    testID="dateTimePicker"
                    value={value}
                    mode={info.widget_type}
                    is24Hour={true}
                    display="default"
                    maximumDate={value}
                    onChange={onChange}
                    />
            )}
        </View>
        <Divider style={styles.divider} />
        </>
  )
}

const getStyle = (key) => {
    return {
        container: {
            paddingHorizontal: 15, 
            paddingVertical: 10
        },
        description: {
            color: theme[key].text.info, 
            fontWeight: "700", 
            fontSize: 14,
            marginRight: 15
        },
        containRadio: {
            flexDirection: "row", 
            alignItems: "center"
        },
        descriptionRadio: {
            color: theme[key].text.info, 
            fontSize: 12
        },
        divider: {
            borderColor: theme[key].accordion.backgroundColor, 
            borderWidth: 1
        }
    }
}

export default DateCustom;