import produce from 'immer';

export function setSurveyFish(state, payload) {
    return produce(state, (draft) => {
        draft.surveyFish = payload;
    })
}