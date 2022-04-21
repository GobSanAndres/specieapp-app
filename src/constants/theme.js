import { colorPrimary, colorSecond } from "./colors";


export const theme = {
    primary: {
        button: {
            textColor: colorPrimary.ligth,
            backgroundColor: colorPrimary.primary,
            borderColor: colorPrimary.primary,
            secondBgColor: colorPrimary.second,
            secondeTxColor: colorPrimary.primary
        },
        input: {
            textColor: colorPrimary.primary,
            backgroundColor: colorPrimary.third,
            borderColor: colorPrimary.second
        },
        text: {
            info: colorPrimary.primary,
            error: colorPrimary.error,
            success: colorPrimary.success
        },
        back: {
           backgroundColor: colorPrimary.ligth
        },
        header:{
            textColor: colorPrimary.white,
            backgroundColor: colorPrimary.primary,
            isNetwork: colorPrimary.success,
            noNetwork: colorPrimary.error
        },
        inputError: {
            textColor: "",
            backgroundColor: "",
            borderColor: ""
        },
        tab:{
            active: colorPrimary.primary,
            noActive: colorPrimary.second
        },
        accordion:{
            backgroundColor: colorPrimary.third,
            color: colorPrimary.primary
        },
        module1:{
            backgroundColor: colorPrimary.primary,
            textColor: colorPrimary.ligth
        },
        module2:{
            backgroundColor: colorPrimary.second,
            textColor: colorPrimary.primary
        },
        loading:{
            component: colorPrimary.ligth
        },
        card1:{
            backgroundColor: colorPrimary.primary,
            textColor: colorPrimary.ligth
        },
        card2:{
            backgroundColor: colorPrimary.second,
            textColor: colorPrimary.primary
        },
        imgLogin:{
            img: require("../resources/primarybg.png"),
            bgColor: colorPrimary.primary
        }
    },
    second: {
        button: {
            textColor: colorSecond.ligth,
            backgroundColor: colorSecond.primary,
            borderColor: colorSecond.primary,
            secondBgColor: colorSecond.second,
            secondeTxColor: colorSecond.primary
        },
        input: {
            textColor: colorSecond.primary,
            backgroundColor: colorSecond.third,
            borderColor: colorSecond.second
        },
        text: {
            info: colorSecond.primary,
            error: colorSecond.error,
            success: colorSecond.success
        },
        back: {
           backgroundColor: colorSecond.ligth
        },
        header:{
            textColor: colorSecond.white,
            backgroundColor: colorSecond.primary,
            isNetwork: colorSecond.success,
            noNetwork: colorSecond.error
        },
        inputError: {
            textColor: "",
            backgroundColor: "",
            borderColor: ""
        },
        tab:{
            active: colorSecond.primary,
            noActive: colorSecond.second
        },
        accordion:{
            backgroundColor: colorSecond.third,
            color: colorSecond.primary
        },
        module1:{
            backgroundColor: colorSecond.primary,
            textColor: colorSecond.ligth
        },
        module2:{
            backgroundColor: colorSecond.second,
            textColor: colorSecond.primary
        },
        loading:{
            component: colorSecond.ligth
        },
        card1:{
            backgroundColor: colorSecond.primary,
            textColor: colorSecond.ligth
        },
        card2:{
            backgroundColor: colorSecond.second,
            textColor: colorSecond.primary
        },
        imgLogin:{
            img: require("../resources/secondbg.png"),
            bgColor: colorPrimary.primary
        }
    }
}