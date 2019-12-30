import * as types from './mutation-types';
import services from '../../../http';

export const ActionFindOrdemServicos = ({ commit }) => {
    return services.ordemServico.findOrdemServicos()
    .then(res => {
        commit(types.SET_ORDEM_SERVICO, res.data);
    });
};

export const ActionAddOrdemServicos = ({ commit }, payload) => {
    return services.ordemServico.addOrdemServico(Object.assign({}, payload));
};