export const getKeys = json => {
  let respJson = {
    idFormulario: json.idFormulario,
    nameSurvey: json.nameSurvey,
    category: json.category,
  };
  let jsonRequired = {}; //Se inicializa jsonRequired
  json.sections.forEach(section => {
    if (section.duplicate) {
      let dataDuplicate = {};
      section.question.forEach(quest => {
        if (quest.widget_type == 'checkbox')
          dataDuplicate = {...dataDuplicate, [quest.nameQuestion]: []};
        else if (quest.widget_type == 'date' || quest.widget_type == 'time')
          dataDuplicate = {...dataDuplicate, [quest.nameQuestion]: null};
        else dataDuplicate = {...dataDuplicate, [quest.nameQuestion]: ''};
        jsonRequired[quest.nameQuestion] = quest.required; //se agrega valor de required
      });

      respJson = {...respJson, [section.nameQuestion]: [{...dataDuplicate}]};
    } else {
      section.question.forEach(quest => {
        if (quest.widget_type == 'checkbox')
          respJson = {...respJson, [quest.nameQuestion]: []};
        else if (quest.widget_type == 'date' || quest.widget_type == 'time')
          respJson = {...respJson, [quest.nameQuestion]: null};
        else respJson = {...respJson, [quest.nameQuestion]: ''};
        jsonRequired[quest.nameQuestion] = quest.required; //se agrega valor de required
      });
    }
  });

  return {formJson: respJson, jsonRequired}; //Se modifica el type del response por un objeto, agregando el jsonRequired
};

export const jsonvalid = json => {
  let array = [];
  for (var key in json) {
    if (json[key].widget_type != undefined)
      array.push({...json[key], name: key});
  }
  return array;
};
