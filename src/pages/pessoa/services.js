export default {
    findClientes: {method: 'get', url: 'pessoas?nome={nome}'},
    findResponsaveis: {method: 'get', url: 'pessoas/funcionarios'},
    addCliente: {method: 'post', url: 'pessoas', '': '{params}'},
}