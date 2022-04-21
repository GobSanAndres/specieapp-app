import { setSurveyAgroCreator } from '../../redux/actions/surveyAgro/SurveyAgroActionCreator';

export const setSurveyAgroMiddleware = (object) => {

    return function (dispatch){
        dispatch(setSurveyAgroCreator(object));
    }
}