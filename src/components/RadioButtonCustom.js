import React from "react";
import { View, Text } from 'react-native';
import { RadioButton, Divider } from 'react-native-paper';
import { useSelector } from "react-redux";
import { theme } from "../constants/theme";
import { getColorText, updateArray } from "../utils/validate";


const RadioButtonCustom = (props) => {
    const { items, description, form, setForm, info, intentSend, section } = props;
    const { duplicate } = section;
    const index = info.index != undefined ? info.index : 0;

    const {idTheme} = useSelector(state => state);

    const [value, setValue] = React.useState(duplicate ? form[section.nameQuestion][index][info.nameQuestion] : form[info.nameQuestion]);

    

    const colorText = getColorText({ theme, idTheme, duplicate, form, index, info, intentSend, section });

    const handle = (newValue) => {
        setValue(newValue);
        if(duplicate){
            const newArray = updateArray(form[section.nameQuestion], newValue, form, section, index, info, duplicate);
            setForm({...form, [section.nameQuestion]: newArray});
        }else
            setForm({...form, [info.nameQuestion]: newValue})
    }

    const styles = getStyle(idTheme);

    
    return(
        <>
        <View style={styles.container}>
            <Text style={{...styles.description, color: colorText}}>{ description } { info.required && " *" }</Text>
            <RadioButton.Group onValueChange={newValue => handle(newValue)} value={value}>
                {
                    items != undefined && (
                    items.map((item, i) => (
                        <View key={i.toString()} style={styles.containRadio}>
                            <RadioButton value={item.idData} color={theme[idTheme].text.info} />
                            <Text style={styles.descriptionRadio}>
                                {item.descriptionData}
                            </Text>
                        </View>
                    ))
                    )
                }
            </RadioButton.Group>
        </View>
        <Divider style={styles.divider} />
        </>
  )
}

const getStyle = (key) => {
    return {
        container: {
            paddingHorizontal: 15, 
            paddingVertical: 5
        },
        description: {
            color: theme[key].text.info, 
            fontWeight: "700", 
            fontSize: 14
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

export default RadioButtonCustom;