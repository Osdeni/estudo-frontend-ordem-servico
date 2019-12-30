export default {
    findOrdemServicos: {method: 'get', url: 'ordem-servicos?status={status}'},
    addOrdemServico: {method: 'post', url: 'ordem-servicos', '': '{params}'},
    listOrdemServicosStatus: {method: 'get', url: 'ordem-servicos/status'},
}