import * as types from './mutation-types';

export default {
    [types.SET_ORDEM_SERVICO] (state, payload) {
        state.ordemServico = payload
    },
    [types.SET_ORDEM_SERVICOS] (state, payload) {
        state.ordensServicos = payload
    },
    [types.SET_ORDEM_SERVICO_STATUS] (state, payload) {
        state.ordemServicosStatus = payload
    },
    [types.SET_ORDEM_SERVICO_EVOLUCOES] (state, payload) {
        state.ordemServicoEvolucoes = payload
    }
}