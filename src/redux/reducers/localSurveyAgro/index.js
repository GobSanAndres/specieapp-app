import produce from 'immer';

export function setLocalSurveyAgro(state, payload) {
    return produce(state, (draft) => {
        draft.localSurveyAgro = payload;
    })
}