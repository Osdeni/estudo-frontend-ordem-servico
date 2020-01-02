import * as types from './mutation-types';

export default {
    [types.ADD_CLIENTE] (state, payload) {
        state.cliente = payload
    },
    [types.SET_CLIENTES] (state, payload) {
        state.clientes = payload
    },
    [types.SET_RESPONSAVEIS] (state, payload) {
        state.responsaveis = payload
    }
}