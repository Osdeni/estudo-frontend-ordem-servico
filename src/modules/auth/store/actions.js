import * as types from './mutation-types';
import * as storage from '../storage';
import services from '../../../http';

export const ActionDoLogin = ({ dispatch }, payload) => {
    return services.auth.login(payload)
        .then(res => {
            dispatch('ActionSetToken', res.data.token);
            dispatch('ActionSetUser', res.data.usuario);
        });
}

export const ActionCheckToken = ({ dispatch, state }) => {
    if (state.token) {
        return Promise.resolve(state.token);
    }

    const token = storage.getLocalToken();

    if (!token) {
        return Promise.reject(new Error("Token inválido"));
    }

    dispatch('ActionSetToken', token);

    return Promise.resolve(token);
};

export const ActionSignOut = ({ dispatch }) => {
    storage.setHeaderToken('');
    storage.deleteLocalToken();
    dispatch('ActionSetUser', {});
    dispatch('ActionSetToken', '');
}

// TODO reavaliar uso deste item
export const ActionSetUser = ({ commit }, payload) => {
    commit(types.SET_USER, payload);
};

export const ActionSetToken = ({ commit }, payload) => {
    storage.setHeaderToken(payload);
    storage.setLocalToken(payload);
    commit(types.SET_TOKEN, payload);
};