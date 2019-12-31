export default {
    findOrdemServicos: {method: 'get', url: 'ordem-servicos?status={status}&responsavel.nome={responsavel}'},
    findOrdemServico: {method: 'get', url: 'ordem-servicos/{id}'},
    addOrdemServico: {method: 'post', url: 'ordem-servicos', '': '{params}'},
    listOrdemServicosStatus: {method: 'get', url: 'ordem-servicos/status'},
}