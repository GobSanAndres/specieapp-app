import { setIsNetworkCreator } from '../../redux/actions/isNetwork/IsNetworkActionCreator';

export const setIsNetworkMiddleware = (object) => {

    return function (dispatch){
        dispatch(setIsNetworkCreator(object));
    }
}