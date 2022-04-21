import { setDataSaveFish } from '../../reducers/dataSaveFish';
import { DataSaveFishActionTypes  } from './DataSaveFishActions';

export const setDataSaveFishCreator = (payload) => ({
    type: DataSaveFishActionTypes.getDataSaveFish,
    payload,
    reducer: setDataSaveFish
});