export const getKeys = (json) => {
    let respJson = {idFormulario: json.idFormulario, nameSurvey: json.nameSurvey, category: json.category};

    json.sections.forEach(section => {
        if(section.duplicate){
            let dataDuplicate = {};
            section.question.forEach(quest => {
                if(quest.widget_type == "checkbox")
                    dataDuplicate = { ...dataDuplicate, [quest.nameQuestion]: []}
                else if(quest.widget_type == "date" || quest.widget_type == "time")
                    dataDuplicate = { ...dataDuplicate, [quest.nameQuestion]: null}
                else
                    dataDuplicate = { ...dataDuplicate, [quest.nameQuestion]: ""}

                
            })
            respJson = { ...respJson, [section.nameQuestion]: [{ ...dataDuplicate }]}
        }else{
            section.question.forEach(quest => {
                if(quest.widget_type == "checkbox")
                    respJson = { ...respJson, [quest.nameQuestion]: []}
                else if(quest.widget_type == "date" || quest.widget_type == "time")
                    respJson = { ...respJson, [quest.nameQuestion]: null}
                else
                    respJson = { ...respJson, [quest.nameQuestion]: ""}
            })
        }
    });
    return respJson;
}

export const jsonvalid = (json) =>{
    let array = [];
     for(var key in json){
         if(json[key].widget_type != undefined)
             array.push({...json[key], name: key})
 
     }
     return array;
}