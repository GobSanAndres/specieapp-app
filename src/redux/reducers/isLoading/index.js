import produce from 'immer';

export function setIsLoading(state, payload) {
    return produce(state, (draft) => {
        draft.isLoading = payload;
    })
}