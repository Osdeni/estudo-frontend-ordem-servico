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

export const ActionFindResponsaveis = ({ commit }, payload) => {
    return services.cliente.findResponsaveis()
    .then(res => {
        commit(types.SET_RESPONSAVEIS, res.data);    
    });
};