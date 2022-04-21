import produce from 'immer';

export function setIsNetwork(state, payload) {
    return produce(state, (draft) => {
        draft.isNetwork = payload;
    })
}