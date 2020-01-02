import * as types from './mutation-types';

export default {
    [types.SET_ORDEM_SERVICO] (state, payload) {
        state.ordemServico = payload;
    },
    [types.SET_ORDEM_SERVICO_ALT_STATUS] (state, payload) {
        state.ordemServico.status = payload;
    },
    [types.SET_ORDEM_SERVICOS] (state, payload) {
        state.ordensServicos = payload;
    },
    [types.SET_ORDEM_SERVICO_STATUS] (state, payload) {
        state.ordemServicosStatus = payload;
    },
    [types.SET_ORDEM_SERVICO_EVOLUCOES] (state, payload) {
        state.ordemServicoEvolucoes = payload;
    },
    [types.SET_ORDEM_SERVICO_EVOLUCOES_DIRECT] (state, payload) {
        state.ordemServicoEvolucoes.unshift(payload);
    },
    [types.SET_ORDEM_SERVICO_EVOLUCAO] (state, payload) {
        state.ordemServicoEvolucao = payload;
    }
}