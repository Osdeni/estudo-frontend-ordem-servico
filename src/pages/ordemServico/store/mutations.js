import * as types from './mutation-types';

export default {
    [types.SET_ORDEM_SERVICO] (state, payload) {
        state.ordensServicos = payload
    },
    [types.SET_ORDEM_SERVICO_STATUS] (state, payload) {
        state.ordemServicosStatus = payload
    }
}