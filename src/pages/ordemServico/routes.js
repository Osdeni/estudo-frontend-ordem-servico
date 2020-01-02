export default [
    {
        name: 'ordem-servico-add',
        path: '/ordem-servicos/add',
        component: () => System.import(/* webpackChunkName: "OrdemServico" */ './pages/OrdemServicoAdd.vue'),
        children: [
            {
                name: 'ordem-servico-add-cliente-add',
                path: '/cliente',
                component: () => System.import(/* webpackChunkName: "Cliente" */ '@/pages/pessoa/ClienteAdd.vue'),
            }
        ]
    },
    {
        name: 'ordem-servico',
        path: '/ordem-servicos',
        component: () => System.import(/* webpackChunkName: "OrdemServico" */ './OrdemServico.vue')
    },
    {
        name: 'ordem-servico-detalhe',
        path: '/ordem-servicos/:id',
        propos: true,
        component: () => System.import(/* webpackChunkName: "OrdemServico" */ './OrdemServicoDetalhe.vue'),
        children: [
            {
                name: 'ordem-servico-detalhe-evolucao-add',
                path: '/ordem-servicos/:id/evolucao-add',
                component: () => System.import(/* webpackChunkName: "OrdemServico" */ './pages/OrdemServicoEvolucaoAdd.vue'),
            }
        ]
    }

]