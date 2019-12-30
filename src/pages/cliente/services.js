export default {
    findClientes: {method: 'get', url: 'pessoas?nome={nome}'},
    findResponsaveis: {method: 'get', url: 'pessoas?nome={nome}'},
    addCliente: {method: 'post', url: 'pessoas', '': '{params}'},
}