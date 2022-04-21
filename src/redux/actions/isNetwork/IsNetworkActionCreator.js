import { setIsNetwork } from '../../reducers/isNetwork';
import { IsNetworkActionTypes  } from './IsNetworkActions';

export const setIsNetworkCreator = (payload) => ({
    type: IsNetworkActionTypes.getIsNetwork,
    payload,
    reducer: setIsNetwork
});