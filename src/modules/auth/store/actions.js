import * as types from './mutation-types';
import * as storage from '../storage';
import services from '../../../http';

export const ActionDoLogin = ({ dispatch }, payload) => {
    return services.auth.login(payload)
        .then(res => {
            dispatch('ActionSetToken', res.data.token);
            dispatch('ActionSetUser', window._Vue.$jwt.decode(res.data.token));
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
    dispatch('ActionSetUser', storage.getLocalUsuario());


    return Promise.resolve(token);
};

export const ActionSignOut = ({ dispatch }) => {
    storage.setHeaderToken('');
    storage.deleteLocalToken();
    storage.deleteLocalUsuario();
    dispatch('ActionSetUser', {});
    dispatch('ActionSetToken', '');
}

// TODO reavaliar uso deste item
export const ActionSetUser = ({ commit }, payload) => {
    storage.setLocalUsuario(payload);
    commit(types.SET_USER, payload);
};

export const ActionSetToken = ({ commit }, payload) => {
    storage.setHeaderToken(payload);
    storage.setLocalToken(payload);
    commit(types.SET_TOKEN, payload);
};

/**
 * Faz checagem da role possível rolesAllowed em comparação coma Role que vem no token do usuário 
 * @param {*} param0 
 * @param {*} rolesAllowed 
 */
export const ActionCheckIsRole = ({ state }, rolesAllowed = []) => {
    if (!Array.isArray(rolesAllowed)) {
        alert('ActionCheckIsRole: O parâmetro deve ser array: ["", ""...]');
        return Promise.resolve(false);
    }

    let rolesUser = [];

    try {
        rolesUser = state.user.usuario.roles;
    } catch (e) { }

    let checkedAllowed = [];
    let checkedUserAllowed = [];
    if (rolesAllowed.length > 0 && rolesUser.length > 0) {
        checkedAllowed = rolesAllowed.filter((role) => {
            checkedUserAllowed = rolesUser.filter((userRole) => {
                return userRole.authority == role;
            });
        });

        if (checkedUserAllowed.length > 0) {
            return Promise.resolve(true);
        }
    }

    return Promise.resolve(false);
};