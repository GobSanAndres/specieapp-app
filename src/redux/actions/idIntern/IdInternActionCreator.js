import { setIdIntern } from '../../reducers/idIntern';
import { IdInternActionTypes  } from './IdInternActions';

export const setIdInternCreator = (payload) => ({
    type: IdInternActionTypes.getIdIntern,
    payload,
    reducer: setIdIntern
});