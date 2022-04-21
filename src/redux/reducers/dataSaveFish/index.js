import produce from 'immer';

export function setDataSaveFish(state, payload) {
    return produce(state, (draft) => {
        draft.dataSaveFish = payload;
    })
}