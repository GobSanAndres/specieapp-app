import produce from 'immer';

export function setUser(state, payload) {
    return produce(state, (draft) => {
        draft.user = payload;
    })
}