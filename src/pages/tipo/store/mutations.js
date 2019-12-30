import * as types from './mutation-types';

export default {
    [types.SET_TIPO] (state, payload) {
        state.tipos = payload
    }
}