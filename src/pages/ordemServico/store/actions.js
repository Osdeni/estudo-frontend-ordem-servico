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

export const ActionAlterarStatusOrdemServico = ({ commit, state }, payload) => {
    state.ordemServico.status.index = payload;
    commit(types.SET_ORDEM_SERVICO, state.ordemServico);
};

// EVOLUÇÕES
export const ActionAddEvolucao = ({ commit, state }, payload) => {
    return services.ordemServico.addEvolucao({ ordemServicoId: state.ordemServico.id }, payload)
        .then(res => {
            if (payload.status !== undefined && res.data.status !== undefined) {
                state.ordemServico.status = res.data.status;
                commit(types.SET_ORDEM_SERVICO, state.ordemServico);
            }
        });
};

export const ActionListAllEvolucoes = ({ commit }, payload) => {
    return services.ordemServico.listAllEvolucoes({ ordemServicoId: payload })
        .then(res => {
            commit(types.SET_ORDEM_SERVICO_EVOLUCOES, res.data)
        });
};
