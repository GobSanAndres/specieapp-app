import { setUserCreator } from '../../redux/actions/user/userActionCreator';


export const setUserMiddleware = (object) => {

    return function (dispatch){
        dispatch(setUserCreator(object));
    }
}