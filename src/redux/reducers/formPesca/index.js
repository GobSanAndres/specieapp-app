import produce from 'immer';

export function setFormPesca(state, payload) {
    return produce(state, (draft) => {
        draft.formPesca = payload;
    })
}