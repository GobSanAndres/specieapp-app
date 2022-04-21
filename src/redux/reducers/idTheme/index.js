import produce from 'immer';

export function setIdTheme(state, payload) {
    return produce(state, (draft) => {
        draft.idTheme = payload;
    })
}