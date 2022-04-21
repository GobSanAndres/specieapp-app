import { setFormPesca } from '../../reducers/formPesca';
import { FormPescaActionTypes  } from './FormPescaActions';

export const setFormPescaCreator = (payload) => ({
    type: FormPescaActionTypes.getFormPesca,
    payload,
    reducer: setFormPesca
});