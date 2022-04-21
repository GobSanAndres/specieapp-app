import { setIdTheme } from '../../reducers/idTheme';
import { IdThemeActionTypes  } from './IdThemeActions';

export const setIdThemeCreator = (payload) => {
    return ({
        type: IdThemeActionTypes.getIdTheme,
        payload,
        reducer: setIdTheme
    })
};