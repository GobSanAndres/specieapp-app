import { setIdInternCreator } from '../../redux/actions/idIntern/IdInternActionCreator';

export const setIdInternMiddleware = (object) => {

    return function (dispatch){
        dispatch(setIdInternCreator(object));
    }
}