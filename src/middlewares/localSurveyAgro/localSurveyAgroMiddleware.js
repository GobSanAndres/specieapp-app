import { setLocalSurveyAgroCreator } from '../../redux/actions/localSurveyAgro/LocalSurveyAgroActionCreator';

export const setLocalSurveyAgroMiddleware = (object) => {

    return function (dispatch){
        dispatch(setLocalSurveyAgroCreator(object));
    }
}