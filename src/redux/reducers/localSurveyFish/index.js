import produce from 'immer';

export function setLocalSurveyFish(state, payload) {
    return produce(state, (draft) => {
        draft.localSurveyFish = payload;
    })
}