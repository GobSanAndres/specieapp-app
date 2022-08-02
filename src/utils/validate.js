export const validateEmail = email => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const validateNumber = number => {
  const re = /^[0-9]+$/;
  return re.test(number);
};

export const validJson = json => {
  let resp = true;

  for (var key in json) {
    if (json.hasOwnProperty(key)) {
      let tempJson = json[key];
      if (tempJson != null || tempJson != undefined) {
        if (tempJson.trim() == '') resp = false;
      } else resp = false;
    }
  }

  return resp;
};
//Se realizan ajustes necesarios para validar las preguntas con required en true
export const validDataJson = (json, jsonRequired) => {
  let resp = true;

  for (var key in json) {
    if (json.hasOwnProperty(key)) {
      let tempJson = json[key];
      if (Array.isArray(tempJson))
        tempJson.forEach(element => {
          for (var k in element) {
            if (jsonRequired[k] && resp) resp = validateKeyRequired(element[k]); //Ojo agregar función
          }
        });
      else if (jsonRequired[key] && resp) resp = validateKeyRequired(tempJson);
    }
  }
  return resp;
};

//Nueva función para validar - se encarga de validar el contenido de cada key del json
const validateKeyRequired = tempJson => {
  let resp = true;
  if (typeof tempJson == 'string') {
    if (tempJson.trim() == '') resp = false;
  }
  return resp;
};

export const getKeyTable = json => {
  let resp = [];
  for (var key in json) {
    if (key != 'idFormulario' && key != 'nameSurvey') resp.push(key);
  }
  return resp;
};

export const getDataTable = dataArray => {
  let dataResp = [];
  dataArray.forEach(json => {
    let tempArray = [];
    for (var key in json) {
      if (key != 'idFormulario' && key != 'nameSurvey') {
        if (
          typeof json[key] == 'string' &&
          json[key].substring(0, 14) != 'data:image/png'
        )
          tempArray.push({value: json[key], type: 'string'});
        else if (
          typeof json[key] == 'string' &&
          json[key].substring(0, 14) == 'data:image/png'
        )
          tempArray.push({value: json[key], type: 'image'});
        else if (typeof json[key] == 'number')
          tempArray.push({value: json[key], type: 'string'});
        else
          tempArray.push({value: getWordsiInArray(json[key]), type: 'string'});
      }
    }
    dataResp.push(tempArray);
  });
  return dataResp;
};

const getWordsiInArray = array => {
  let resp = '';
  array.forEach((element, pos) => {
    const separate = pos == array.length - 1 ? '' : ' / ';
    resp = resp + element + separate;
  });

  return resp;
};

export const getKey = (form, section, index, info, duplicate) => {
  let resp = '';

  if (duplicate) resp = form[section.nameQuestion][index];
  else resp = info;

  let keyResp = '';
  for (var key in resp) {
    if (key == [info.nameQuestion]) keyResp = key;
  }
  return keyResp;
};

export const updateArray = (
  array,
  text,
  form,
  section,
  index,
  info,
  duplicate,
) => {
  let newArray = [];

  const newObject = {
    ...array[index],
    [getKey(form, section, index, info, duplicate)]: text,
  };
  array.forEach((element, elem) => {
    if (elem != index) newArray.push(element);
    else newArray.push(newObject);
  });

  return newArray;
};

export const getColorTextArray = ({
  theme,
  idTheme,
  intentSend,
  info,
  duplicate,
  form,
  section,
  index,
}) => {
  let resp = theme[idTheme].text.info;
  if (intentSend && info.required) {
    if (
      duplicate &&
      form[section.nameQuestion][index][info.nameQuestion].length == 0
    ) {
      resp = theme[idTheme].text.error;
    } else if (!duplicate && form[info.nameQuestion].length == 0) {
      resp = theme[idTheme].text.error;
    }
  }
};

export const getColorText = ({
  theme,
  idTheme,
  duplicate,
  form,
  index,
  info,
  intentSend,
  section,
}) => {
  let resp = theme[idTheme].text.info;
  const text = duplicate
    ? form[section.nameQuestion][index][info.nameQuestion]
    : form[info.nameQuestion];

  if (
    intentSend &&
    info.required &&
    typeof text == 'string' &&
    text.trim() == ''
  )
    resp = theme[idTheme].text.error;

  return resp;
};

export const getDuplicateSection = (sections, json) => {
  let resp = [];
  let tempSections = sections.filter(item => item.duplicate == true);

  if (json.idintern) {
    tempSections.map(item => {
      for (var key in json) {
        if (item.nameQuestion == key) {
          let elementJson = 0;
          json[key].map(js => {
            for (var k in js) {
              elementJson++;
            }
          });

          if (item.question.length < elementJson) {
            const duplicate = elementJson / item.question.length;
            resp.push({id: item.idSection, duplicate});
          }
        }
      }
    });
  } else {
    tempSections.map(section => {
      resp.push({id: section.idSection, duplicate: 0});
    });
  }

  return resp;
};

export const getCopy = (sections, formState) => {
  let resp = [];

  sections.map(section => {
    if (section.duplicate) {
      const json = formState[section.nameQuestion][0];
      let blankJson = {};

      for (var key in json) {
        if (typeof json[key] == 'string') blankJson = {...blankJson, [key]: ''};
        else if (typeof json[key] == 'number')
          blankJson = {...blankJson, [key]: null};
        else blankJson = {...blankJson, [key]: []};
      }
      resp.push({id: section.idSection, value: blankJson});
    }
  });

  return resp;
};

export const validDataSection = (sections, formState) => {
  let countArrayDuplicate = [];
  const json = formState;
  let tempSections = sections.filter(item => item.duplicate == true);

  if (formState.idintern) {
    tempSections.map(item => {
      for (var key in json) {
        if (item.nameQuestion == key) {
          let elementJson = 0;
          json[key].map(js => {
            for (var k in js) {
              elementJson++;
            }
          });

          if (item.question.length < elementJson) {
            const duplicate = elementJson / item.question.length;
            countArrayDuplicate.push({name: item, duplicate});
          }
        }
      }
    });
  }
  //console.log("temp lengt ", countArrayDuplicate);
  return countArrayDuplicate;
};
