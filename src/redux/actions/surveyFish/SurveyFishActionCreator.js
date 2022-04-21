import { setSurveyFish } from '../../reducers/surveyFish';
import { SurveyFishActionTypes  } from './SurveyFishActions';

export const setSurveyFishCreator = (payload) => ({
    type: SurveyFishActionTypes.getSurveyFish,
    payload,
    reducer: setSurveyFish
});