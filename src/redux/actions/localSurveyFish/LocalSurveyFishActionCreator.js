import { setLocalSurveyFish } from '../../reducers/localSurveyFish';
import { LocalSurveyFishActionTypes  } from './LocalSurveyFishActions';

export const setLocalSurveyFishCreator = (payload) => ({
    type: LocalSurveyFishActionTypes.getLocalSurveyFish,
    payload,
    reducer: setLocalSurveyFish
});