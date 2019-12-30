import * as types from './mutation-types';
import services from '../../../http';

export const ActionFindOrdemServicos = ({ commit }, status) => {
    return services.ordemServico.findOrdemServicos({ status: status })
    .then(res => {
        commit(types.SET_ORDEM_SERVICO, res.data);
    });
};

export const ActionListOrdemServicosStatus = ({ commit }) => {
    return services.ordemServico.listOrdemServicosStatus()
    .then(res => {
        commit(types.SET_ORDEM_SERVICO_STATUS, res.data);
    });
};

export const ActionAddOrdemServicos = ({ commit }, payload) => {
    return services.ordemServico.addOrdemServico(Object.assign({}, payload));
};