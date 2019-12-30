import * as types from './mutation-types';
import services from '../../../http';

export const ActionAddCliente = ({ commit }, payload) => {
    return services.cliente.addCliente(Object.assign({}, payload));
};

export const ActionFindClienteAutocomplete = ({ commit }, payload) => {
    return services.cliente.findClientes({ nome: payload })
    .then(res => {
        commit(types.SET_CLIENTES, res.data.content);    
    });
};

export const ActionFindResponsavelAutocomplete = ({ commit }, payload) => {
    return services.cliente.findResponsaveis({ nome: payload })
    .then(res => {
        commit(types.SET_RESPONSAVEIS, res.data.content);    
    });
};