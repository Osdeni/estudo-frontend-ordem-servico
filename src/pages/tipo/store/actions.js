import * as types from './mutation-types';
import services from '../../../http';

export const ActionFindAllTipos = ({ commit }) => {
    return services.tipo.findAllTipos()
    .then(res => {
        commit(types.SET_TIPO, res.data);
    });
};