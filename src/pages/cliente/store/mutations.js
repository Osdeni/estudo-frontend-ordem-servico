import * as types from './mutation-types';

export default {
    [types.ADD_CLIENTE] (state, payload) {
        state.cliente = payload
    }
}