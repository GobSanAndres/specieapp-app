import { Alert } from "react-native";


const AlertGeneric = (title, message, text, cancelable, action, textCancel, actionCancel) => {
    //console.log("");
    let options = []
    if(textCancel != undefined && textCancel != null)
        options.push({ text: textCancel, 
            onPress: () => {
                if(actionCancel != null) actionCancel()
            } 
        })
    options.push({ text, 
        onPress: () => {
            if(action != null) action()
        } 
    })

    
    Alert.alert(
        title,
        message,
        options,
        {cancelable}
    );
}

export default AlertGeneric;