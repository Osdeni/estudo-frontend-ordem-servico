export default {
    findOrdemServicos: {method: 'get', url: 'ordem-servicos?status={status}&responsavel.id={responsavel}'},
    findOrdemServico: {method: 'get', url: 'ordem-servicos/{id}'},
    addOrdemServico: {method: 'post', url: 'ordem-servicos', '': '{params}'},
    listOrdemServicosStatus: {method: 'get', url: 'ordem-servicos/status'},

    addEvolucao: {method: 'post', url: 'ordem-servicos/{ordemServicoId}/evolucoes', '': '{params}'},
    listAllEvolucoes: {method: 'get', url: 'ordem-servicos/{ordemServicoId}/evolucoes'}
}