import { setIdThemeCreator } from '../../redux/actions/idTheme/IdThemeActionCreator';

export const setIdThemeMiddleware = (object) => {
    return function (dispatch){
        dispatch(setIdThemeCreator(object));
    }
}