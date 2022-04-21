import { setUser } from '../../reducers/user';
import { UserActionTypes  } from './userAction';

export const setUserCreator = (payload) => ({
    type: UserActionTypes.getUser,
    payload,
    reducer: setUser
});