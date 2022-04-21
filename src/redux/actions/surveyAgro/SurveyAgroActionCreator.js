import { setSurveyAgro } from '../../reducers/surveyAgro';
import { SurveyAgroActionTypes  } from './SurveyAgroActions';

export const setSurveyAgroCreator = (payload) => ({
    type: SurveyAgroActionTypes.getSurveyAgro,
    payload,
    reducer: setSurveyAgro
});