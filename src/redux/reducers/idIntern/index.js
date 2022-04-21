import produce from 'immer';

export function setIdIntern(state, payload) {
    return produce(state, (draft) => {
        draft.idIntern = payload;
    })
}