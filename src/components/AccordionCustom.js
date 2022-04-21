import React, { useEffect, useState, useCallback } from "react";
import { List } from 'react-native-paper';
import { theme } from "../constants/theme";
import CheckboxCustom from "./CheckboxCustom";
import Input from "./Input";
import InputSelectCustom from "./InputSelectCustom";
import RadioButtonCustom from "./RadioButtonCustom";
import SignatureCustom from "./SignatureCustom";
import { useSelector } from "react-redux";
import { getCopy, getDuplicateSection, validateNumber, validDataSection } from "../utils/validate";
import DateCustom from "./DateCustom";
import ButtonCustom from "./ButtonCustom";
import { View } from "react-native";
import { metrics } from "../constants/metrics";

let openAcordion = {};
var count = true;

const AccordionCustom = (props) => {
    const { encuestas, formState, setFormState, setIsOpenAcordion, intentSend } = props;
    const [sections, setSections] = useState(encuestas.sections);
    const {idTheme} = useSelector(state => state);
    
    const copy = getCopy(sections, formState);

    const [duplicSection, setDuplicSection] = useState(getDuplicateSection(sections, formState));



    useEffect(() => {
        sections.map((item, i) => {
            openAcordion = { ...openAcordion, [i.toString()]: false}
        });

        return () => {
            count = true;
        }
        
    }, []);

    const itereactDuplicate = () => {
        const countArrayDuplicate = validDataSection(sections, formState)
        if(countArrayDuplicate.length > 0){
            handleSection(countArrayDuplicate[0].name, countArrayDuplicate[0].duplicate - 1)
        }
    }

    
    
    const handleOpen = (acordion) => {
        if(count){
            itereactDuplicate();
            count = false;
        }
        openAcordion = { ...openAcordion,  [acordion]: !openAcordion[acordion]};
        let sw = false;
        for( var key in openAcordion){
            if(openAcordion[key]){
                sw = true;
            }
                
        }
        setIsOpenAcordion(sw);
    }

    const styles = getStyle(idTheme);

    const handleSection = (section, interacte) => {
        
        let newSections = [];
        let newForms = {};
        encuestas.sections.map(item => {
            if(section.idSection != item.idSection)
                newSections.push(item);
            else{
                let itemQuestion = [];
                for (let index = 0; index < interacte; index++) {
                    
                    item.question.map(element => {
                        const quantity = duplicSection.filter(dup => dup.id == section.idSection)[0];
                        const question = { ...element, index: quantity.duplicate + 1};
                        itemQuestion.push(question)
                    })
                
                    
                    
                }
                const question = section.question.concat(itemQuestion);
                const newData = { ...item, question };
                newSections.push(newData);
                

                let arrayDuplicate = [];
                formState[section.nameQuestion].forEach(element => {
                    arrayDuplicate.push(element);
                });
                //arrayDuplicate = formState[section.nameQuestion];
                const copyObject = copy.filter(cop => cop.id == section.idSection)[0].value;
                arrayDuplicate.push(copyObject);

                newForms = { ...formState, [section.nameQuestion]: arrayDuplicate }
                
            }

        });

        setFormState(newForms);
        setSections(newSections);
        updateDuplicate(section, 1);
        //setQuantityDuplicate(quantityDuplicate+1);
        
    }

    const updateDuplicate = (section, increment) => {
        let restDup = [];
        const changeDup = duplicSection.filter(dup => dup.id == section.idSection)[0];
        restDup = duplicSection.filter(dup => dup.id != section.idSection);
        restDup.push({ id: changeDup.id, duplicate: changeDup.duplicate + increment });
        setDuplicSection(restDup);
    }

    const handleDelete = (section) => {
        let newSections = [];
        let newForms = {};
        sections.map(item => {
            if(section.idSection != item.idSection)
                newSections.push(item);
            else{
               
                let question = [];
                
                const json = copy.filter(cop => cop.id == section.idSection)[0].value;
                let ind = 0;
                for (var key in json) {
                    ind++;
                }

                for (let index = 0; index < item.question.length - ind; index++) {
                    question.push(item.question[index]);
                    
                }
                
                const newData = { ...item, question };
                newSections.push(newData);

                let arrayDuplicate = [];
                for (let index = 0; index < formState[section.nameQuestion].length - 1; index++) {
                    arrayDuplicate.push(formState[section.nameQuestion][index])    
                }

                
                newForms = { ...formState, [section.nameQuestion]: arrayDuplicate }
                
            }

        });
        
        updateDuplicate(section, -1);
        //setQuantityDuplicate(quantityDuplicate-1);
        setSections(newSections);
        setFormState(newForms);
    }


    return(
        <>
        <List.Section style={{width: "98%"}}>
            {
                sections.length > 0 && (
                    sections.map((section, sec)=>{  

                        return(
                            <List.Accordion
                                key={sec.toString()}
                                style={styles.container}
                                titleStyle={{color: theme[idTheme].accordion.color}}
                                title={section.nameSection}
                                left={props => <List.Icon {...props} color={theme[idTheme].accordion.color} icon="folder" />}
                                onPress={ () => handleOpen(sec.toString())} 
                            >
                                {
                                    (section.duplicate && section.question.length > 0 && section.moreOne) && (
                                        <View style={{flexDirection: "row", justifyContent: "flex-end"}}>
                                            {
                                                duplicSection.filter(dup => dup.id == section.idSection)[0].duplicate > 0 && (
                                                    <ButtonCustom
                                                        label="-"
                                                        styleButton={{
                                                            width: metrics.screenWidth * 0.1, 
                                                            height: 30, 
                                                            backgroundColor: theme[idTheme].text.error,
                                                            marginTop: 7,
                                                            paddingHorizontal: 2,
                                                            
                                                        }}
                                                        onClick={()=>handleDelete(section)}
                                                    />
                                                )
                                            }
                                            <ButtonCustom
                                                label="+"
                                                styleButton={{
                                                    width: metrics.screenWidth * 0.1, 
                                                    height: 30, 
                                                    backgroundColor: theme[idTheme].text.info,
                                                    marginTop: 7,
                                                    paddingHorizontal: 2,
                                                    marginLeft: 12,
                                                    marginRight: 12
                                                }}
                                                onClick={()=>handleSection(section, 1)}
                                            />
                                        </View>
                                    )
                                }
                                
                                {
                                    section.question.length > 0 && (
                                        section.question.map((item, i) => {
                                            switch (item.widget_type) {
                                               case "select":
                                                    return (
                                                        <InputSelectCustom
                                                            info={item}
                                                            options={item.data}
                                                            placeholder="Selecciona una opción"
                                                            description={item.description}
                                                            key={i.toString()}
                                                            setForm={setFormState}
                                                            form={formState}
                                                            intentSend={intentSend}
                                                            section={section}
                                                            index={i}
                                                        />
                                                    )
                                                case "checkbox":
                                                    return(
                                                        <CheckboxCustom
                                                            items={item.data} 
                                                            description={item.description} 
                                                            key={i.toString()}
                                                            info={item}
                                                            setForm={setFormState}
                                                            form={formState}
                                                            intentSend={intentSend}
                                                            section={section}
                                                            index={i}
                                                        />
                                                    )
                                                case "radiobutton":
                                                    return(
                                                        <RadioButtonCustom 
                                                            items={item.data} 
                                                            description={item.description}
                                                            key={i.toString()}
                                                            info={item}
                                                            setForm={setFormState}
                                                            form={formState}
                                                            intentSend={intentSend}
                                                            section={section}
                                                            index={i}
                                                        />
                                                    )
                                                case "textarea":
                                                case "input":
                                                    return(
                                                        <Input
                                                            placeholder={item.description}
                                                            messageError="Verifique la información ingresada"
                                                            key={i.toString()}
                                                            info={item}
                                                            setForm={setFormState}
                                                            form={formState}
                                                            intentSend={intentSend}
                                                            validChange={item.dataType == "number" ? validateNumber : undefined}
                                                            section={section}
                                                            index={i}
                                                            isMultiline={item.widget_type == "textarea" ? true : false}
                                                        />
                                                    )
                                                
                                                case "canvas":
                                                    return(
                                                        <SignatureCustom
                                                            description={item.description}
                                                            messageError="Verifique la información ingresada"
                                                            key={i.toString()}
                                                            info={item}
                                                            setForm={setFormState}
                                                            form={formState}
                                                            intentSend={intentSend}
                                                            section={section}
                                                        />
                                                    )
                                                case "date":
                                                case "time":
                                                    return(
                                                        <DateCustom
                                                            description={item.description}
                                                            messageError="Verifique la información ingresada"
                                                            key={i.toString()}
                                                            info={item}
                                                            setForm={setFormState}
                                                            form={formState}
                                                            intentSend={intentSend}
                                                            section={section}
                                                        />
                                                    )
                                            }
                                        })
                                    )
                                }
                                
                            </List.Accordion>
                        )
                    })
                )
            }
        </List.Section>
        </>
    )
}

const getStyle = (key) => {
    return {
        container: {
            backgroundColor: theme[key].accordion.backgroundColor, 
            borderRadius: 4,
            marginBottom: 3
        }
    }
}

export default AccordionCustom;
 

