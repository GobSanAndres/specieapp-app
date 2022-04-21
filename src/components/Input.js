import React, {useState} from 'react';
import {TextInput, View, Text} from 'react-native';
import {Divider} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {theme} from '../constants/theme';
import {getKey, updateArray} from '../utils/validate';

const Input = props => {
  const {
    placeholder,
    messageError,
    validChange,
    key,
    form,
    setForm,
    info,
    intentSend,
    section,
    isMultiline,
  } = props;
  const {duplicate} = section;
  const index = info.index != undefined ? info.index : 0;

  //console.log("formmmm ", form[section.nameQuestion]);
  //console.log("index ", index);
  //console.log("info", info);

  const [isFocus, setIsFocus] = useState(false);
  const [error, setError] = useState(false);
  const {idTheme} = useSelector(state => state);
  const [value, setValue] = useState(
    duplicate
      ? form[section.nameQuestion][index][info.nameQuestion]
      : form[info.nameQuestion],
  );

  const styles = getStyle(idTheme);

  const additionalStyle = {
    borderWith: isFocus || error ? 2 : 0,
    borderColor:
      error && value != ''
        ? theme[idTheme].inputError.borderColor
        : theme[idTheme].input.borderColor,
  };

  const colorItemAditional = duplicate
    ? {
        color:
          error ||
          (form[section.nameQuestion][index][info.nameQuestion].trim() == '' &&
            intentSend &&
            info.required)
            ? theme[idTheme].text.error
            : theme[idTheme].text.info,
      }
    : {
        color:
          error ||
          (form[info.nameQuestion].trim() == '' && intentSend && info.required)
            ? theme[idTheme].text.error
            : theme[idTheme].text.info,
      };

  const heightInput = isMultiline ? {height: 100} : {};

  const validateError = () => {
    let resp = false;

    if (duplicate) {
      if (
        form[section.nameQuestion][index][
          getKey(form, section, index, info, duplicate)
        ].trim() == ''
      )
        resp = true;
    } else if (form[info.nameQuestion].trim() == '') resp = true;

    return resp;
  };

  const onChange = text => {
    if (info.dataType == 'number') {
      if (validChange(text) || text == '') {
        setValue(text);
        if (duplicate) {
          const newArray = updateArray(
            form[section.nameQuestion],
            text,
            form,
            section,
            index,
            info,
            duplicate,
          );
          setForm({...form, [section.nameQuestion]: newArray});
        } else setForm({...form, [info.nameQuestion]: text});
        if (validChange != undefined) validate(text);
      }
    } else {
      setValue(text);
      if (duplicate) {
        const newArray = updateArray(
          form[section.nameQuestion],
          text,
          form,
          section,
          index,
          info,
          duplicate,
        );
        setForm({...form, [section.nameQuestion]: newArray});
      } else setForm({...form, [info.nameQuestion]: text});
      if (validChange != undefined) validate(text);
    }
  };

  const validate = text => {
    if (validChange(text)) setError(false);
    else setError(true);
  };

  return (
    <>
      <View
        key={key}
        style={{...styles.sectionSearch, ...additionalStyle, ...heightInput}}>
        <View style={{flex: 0.82}}>
          {value != '' && (
            <Text style={{...styles.placeholder, ...colorItemAditional}}>
              {placeholder}
            </Text>
          )}

          <TextInput
            {...props}
            style={styles.input}
            placeholder={info.required ? `${placeholder} *` : placeholder}
            onChangeText={onChange}
            underlineColorAndroid="transparent"
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            multiline={isMultiline}
            numberOfLines={isMultiline ? 3 : 1}
            maxLength={isMultiline ? 200 : 75}
            keyboardType={
              info.dataType === 'number' ? 'decimal-pad' : 'default'
            }
          />
        </View>
      </View>
      {(error && !isFocus) ||
        (intentSend && validateError() && (
          <Text style={{...styles.messageError, ...colorItemAditional}}>
            {messageError}
          </Text>
        ))}
      <Divider style={styles.divider} />
    </>
  );
};

export default Input;

const getStyle = key => {
  return {
    sectionSearch: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderRadius: 18,
      width: '100%',
      height: 60,
      marginVertical: 10,
    },
    icon: {
      height: 20,
      width: 20,
    },
    input: {
      flex: 1,
      paddingBottom: 7,
      paddingLeft: 0,
      paddingRight: 5,
      color: theme[key].input.textColor,
      width: '100%',
      fontSize: 16,
    },
    placeholder: {
      fontSize: 12,
      paddingTop: 3,
    },
    messageError: {
      textAlign: 'left',
      marginLeft: 15,
      marginTop: 0,
      marginBottom: 5,
    },
    divider: {
      borderColor: theme[key].accordion.backgroundColor,
      borderWidth: 1,
    },
  };
};
