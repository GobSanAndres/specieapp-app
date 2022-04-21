import { setFormPescaCreator } from '../../redux/actions/formPesca/FormPescaActionCreator';

export const setFormPescaMiddleware = (object) => {

    return function (dispatch){
        dispatch(setFormPescaCreator(object));
    }
}