import * as types from './mutation-types';
import services from '../../../http';

export const ActionFindOrdemServicos = ({ commit }, payload) => {

    let parameters = {};

    if (typeof payload == 'object') {

        if (typeof payload.status !== undefined) {
            parameters.status = payload.status;
        }

        if (typeof payload.responsavel !== undefined) {
            parameters.responsavel = payload.responsavel;
        }
    }

    return services.ordemServico.findOrdemServicos(parameters)
        .then(res => {
            commit(types.SET_ORDEM_SERVICOS, res.data);
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

export const ActionFindOrdemServico = ({ commit }, payload) => {
    return services.ordemServico.findOrdemServico({ id: payload })
        .then(res => {
            commit(types.SET_ORDEM_SERVICO, res.data);
        });
};
