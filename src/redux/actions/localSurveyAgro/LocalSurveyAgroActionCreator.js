import { setLocalSurveyAgro } from '../../reducers/localSurveyAgro';
import { LocalSurveyAgroActionTypes  } from './LocalSurveyAgroActions';

export const setLocalSurveyAgroCreator = (payload) => ({
    type: LocalSurveyAgroActionTypes.getLocalSurveyAgro,
    payload,
    reducer: setLocalSurveyAgro
});