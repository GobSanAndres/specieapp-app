import React, { useRef, useState } from "react";
import { View, Text, Image } from "react-native";
import { Divider } from "react-native-paper";
import { useSelector } from "react-redux";
import SignatureCapture from "react-native-signature-capture";
import { theme } from "../constants/theme";
import { metrics } from "../constants/metrics"
import ButtonCustom from "./ButtonCustom";
import { getColorText, updateArray } from "../utils/validate";

const SignatureCustom = (props) => {
    const { description, form, setForm, info, intentSend, section } = props;
    const { duplicate } = section;
    const index = info.index != undefined ? info.index : 0;
    const {idTheme} = useSelector(state => state);

    const refCanva = useRef(null);
    const [onSave, setOnSave] = useState(true);

    const getReset = () => {
        let resp = true;
        if(duplicate && form[section.nameQuestion][index][info.nameQuestion] != "")
            resp = false;
        else if(form[info.nameQuestion] != "")
            resp = false;
        
        return resp;
    }

    const [onReset, setOnReset] = useState(getReset());

    const colorText = getColorText({ theme, idTheme, duplicate, form, index, info, intentSend, section });


    const _onSaveEvent = (result) => {
        const value = `data:image/png;base64,${result.encoded}`;
        if(duplicate){
            const newArray = updateArray(form[section.nameQuestion], value, form, section, index, info, duplicate);
            setForm({...form, [section.nameQuestion]: newArray});
        }else
            setForm({...form, [info.nameQuestion]: value})

    }

    const _onDragEvent = (result) => {
        setOnReset(!result.dragged);
        setOnSave(!result.dragged);
    }

    const saveFirm = () => {
        refCanva.current.saveImage();
        setOnReset(false);
        setOnSave(true);
    }

    const resetFirm = () => {
        if(duplicate && form[section.nameQuestion][index][info.nameQuestion] == "")
            refCanva.current.resetImage();
        else if(form[info.nameQuestion] == "")
            refCanva.current.resetImage();
        
        if(duplicate){
            const newArray = updateArray(form[section.nameQuestion], "", form, section, index, info, duplicate);
            setForm({...form, [section.nameQuestion]: newArray});
        }else
            setForm({...form, [info.nameQuestion]: ""})

        setOnSave(true);
        setOnReset(true);
    }

    const styles = getStyle(idTheme);

    const isImage = () => {
        let resp = false;
        if(duplicate && form[section.nameQuestion][index][info.nameQuestion] !== "")
            resp = true;
        else if(form[info.nameQuestion] !== "")
            resp = true;
        return resp;
    }
   
    return(
        <>
            <View style={styles.container}>
                <Text style={{...styles.title, color: colorText}}>
                        { description } { info.required && " *"}
                </Text>
                {
                    isImage() ? (
                        <Image
                            source={{ uri: duplicate ? form[section.nameQuestion][index][info.nameQuestion] : form[info.nameQuestion]}}
                            style={{width: metrics.screenWidth * 0.9, height: metrics.screenHeigth * 0.2}}
                        />
                    ):(
                        <SignatureCapture
                            style={{
                                width: metrics.screenWidth * 0.9, 
                                height: metrics.screenHeigth * 0.2
                            }}
                            ref={refCanva}
                            onSaveEvent={_onSaveEvent}
                            onDragEvent={_onDragEvent}
                            showNativeButtons={false}
                            showTitleLabel={false}
                            backgroundColor="#ffffff"
                            strokeColor={theme[idTheme].accordion.color}
                            minStrokeWidth={4}
                            maxStrokeWidth={4}
                        />
                    )
                }
                
                
                <View style={styles.containButton}>
                    
                    {
                        !onReset && (
                            <ButtonCustom
                                label="Limpiar"
                                styleButton={{
                                    width: metrics.screenWidth * 0.3, 
                                    height: 30, 
                                    backgroundColor: theme[idTheme].text.error,
                                    marginTop: 7
                                }}
                                onClick={resetFirm}
                                disable={onReset}
                            />
                        )
                    }
                    {
                        !isImage() && (
                            <ButtonCustom
                                label="Guardar"
                                styleButton={{
                                    width: metrics.screenWidth * 0.3, 
                                    height: 30, 
                                    backgroundColor: theme[idTheme].button.backgroundColor,
                                    marginTop: 7
                                }}
                                onClick={saveFirm}
                                disable={onSave}
                            />  
                        )
                    } 
                </View>
            </View>
            <Divider style={styles.divider} />
        </>
    )
}

const getStyle = (key) => {
    return {
        container: { 
            paddingHorizontal: 15, 
            paddingVertical: 5, 
            borderRadius: 10
        },
        title: {
            color: theme[key].text.info, 
            fontWeight: "700", 
            fontSize: 14,
            marginBottom: 8
        },
        containButton: {
            flexDirection: "row", 
            flex: 1,
            justifyContent: "space-around",
            width: metrics.screenWidth * 0.9
        },
        divider: {
            borderColor: theme[key].accordion.backgroundColor, 
            borderWidth: 1
        }
    }
}

export default SignatureCustom;