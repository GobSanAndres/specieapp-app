import { setSurveyFishCreator } from '../../redux/actions/surveyFish/SurveyFishActionCreator';

export const setSurveyFishMiddleware = (object) => {

    return function (dispatch){
        dispatch(setSurveyFishCreator(object));
    }
}