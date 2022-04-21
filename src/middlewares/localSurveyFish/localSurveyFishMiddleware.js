import { setLocalSurveyFishCreator } from '../../redux/actions/localSurveyFish/LocalSurveyFishActionCreator';

export const setLocalSurveyFishMiddleware = (object) => {

    return function (dispatch){
        dispatch(setLocalSurveyFishCreator(object));
    }
}