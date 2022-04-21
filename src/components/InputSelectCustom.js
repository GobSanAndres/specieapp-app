import React, { useState } from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Divider } from "react-native-paper";
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import { metrics } from "../constants/metrics";
import { theme } from "../constants/theme";
import { getKey, updateArray } from "../utils/validate";


const 
InputSelectCustom = (props) => {
    const { info, placeholder, description, setForm, form, intentSend, section } = props;
    const { duplicate } = section;
    const index = info.index != undefined ? info.index : 0;

    const {idTheme} = useSelector(state => state);
    const options = info.data;
    const [toggle, setToggle] = useState(false);

    

    const getDescription = () => {
        let resp = "";
        if(duplicate && form[section.nameQuestion][index][info.nameQuestion] != ""){
            resp =  options.filter(item => item.idData == form[section.nameQuestion][index][info.nameQuestion])[0].descriptionData;
        }else if(!duplicate && form[info.nameQuestion] != ""){
            resp = options.filter(item => item.idData == form[info.nameQuestion])[0].descriptionData;
        }

        return resp;
    }

    const valueDescription = getDescription();


    const handle = () => {
        setToggle(!toggle);
    }

    const selectOption = (option) => {
        if(duplicate){
            const newArray = updateArray(form[section.nameQuestion], option.idData, form, section, index, info, duplicate);
            setForm({...form, [section.nameQuestion]: newArray});
        }else
            setForm({...form, [info.nameQuestion]: option.idData})
    }

    const styles = getStyle(idTheme);

    const colorText = (intentSend && info.required && valueDescription.trim() == "") ? theme[idTheme].text.error : theme[idTheme].text.info;

    return(
        <View>
            <TouchableOpacity onPress={handle}>
                <View style={styles.containDescription}>
                    <Text style={{...styles.textDescription, color: colorText}}>
                        {description}{ "\n" }
                        <Text style={{fontWeight: "400"}}>
                            { (!duplicate && form[info.nameQuestion] != "") ? valueDescription : (duplicate && form[section.nameQuestion][index][info.nameQuestion] != "") ? valueDescription : placeholder }
                            { info.required && " *" }
                        </Text>
                    </Text>
                    <Icon name="arrow-down" size={15} style={styles.iconDescription} />
                </View>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent
                visible={toggle}
            >
                <TouchableOpacity onPress={()=>setToggle(false)} style={styles.touchableModal}>
                    <View style={styles.containModal}>
                        <ScrollView>
                            <View style={styles.containOptions}>
                                {
                                    options.map((option, o)=>(
                                        <TouchableOpacity
                                            onPress={()=>{
                                                selectOption(option);
                                                setToggle(!toggle);
                                            }}
                                            key={o.toString()}
                                            style={styles.touchableOption}
                                        >
                                            <Text style={styles.textOption}>
                                                { option.descriptionData }
                                            </Text>
                                        </TouchableOpacity>
                                    ))
                                }
                            </View>
                        </ScrollView>
                    </View>
                </TouchableOpacity>
            </Modal>
            <Divider style={styles.divider} />
        </View>
    )

}

const getStyle = (key) => {
    return {
        containDescription: {
            alignItems: "center",
            flexDirection: "row",
            paddingHorizontal: 20,
            paddingVertical: 15
        },
        iconDescription: { 
            marginLeft: 10, 
            marginTop: 15, 
            color: theme[key].text.info
        },
        textDescription: {
            fontSize: 14, 
            fontWeight: "700", 
            color: theme[key].text.info
        },
        touchableModal: { 
            justifyContent: "center", 
            alignItems: "center", 
            flex: 1,
            backgroundColor: "rgba(1,1,1,0.5)"
        },
        containModal: {
            width: metrics.screenWidth * 0.8,
            backgroundColor: "white",
            borderRadius: 12,
            paddingVertical: 15,
            justifyContent: "center",
            alignItems: "center"
        },
        containOptions: { 
            justifyContent: "center", 
            alignItems: "center", 
            flex: 1
        },
        touchableOption: {
            alignItems: "center", 
            justifyContent: "center"
        },
        textOption: {
            textAlign: "center",
            alignSelf: "center",
            color: theme[key].text.info,
            paddingVertical: 8
        },
        divider: {
            borderColor: theme[key].accordion.backgroundColor, 
            borderWidth: 1
        }
    }
}

export default InputSelectCustom;