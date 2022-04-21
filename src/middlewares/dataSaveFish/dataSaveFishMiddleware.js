import { setDataSaveFishCreator } from '../../redux/actions/dataSaveFish/DataSaveFishActionCreator';

export const setDataSaveFishMiddleware = (object) => {

    return function (dispatch){
        dispatch(setDataSaveFishCreator(object));
    }
}