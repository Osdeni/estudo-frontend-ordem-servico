import * as types from './mutation-types';
import services from '../../../http';

export const ActionFindAllMarcas = ({ commit }) => {
    return services.marca.findAllMarcas()
    .then(res => {
        commit(types.SET_MARCA, res.data);
    });
};