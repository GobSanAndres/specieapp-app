import { setIsLoading } from '../../reducers/isLoading';
import { IsLoadingActionTypes  } from './IsLoadingActions';

export const setIsLoadingCreator = (payload) => ({
    type: IsLoadingActionTypes.getIsLoading,
    payload,
    reducer: setIsLoading
});