import produce from 'immer';

export function setSurveyAgro(state, payload) {
    return produce(state, (draft) => {
        draft.surveyAgro = payload;
    })
}