import * as types from './mutation-types';

export default {
    [types.SET_ORDEM_SERVICO] (state, payload) {
        state.ordensServicos = payload
    }
}