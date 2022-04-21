import { setIsLoadingCreator } from '../../redux/actions/isLoading/IsLoadingActionCreator';

export const setIsLoadingMiddleware = (object) => {

    return function (dispatch){
        dispatch(setIsLoadingCreator(object));
    }
}