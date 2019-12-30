export default [
    {
        name: 'ordem-servico-add',
        path: '/ordem-servicos/add',
        component: () => System.import(/* webpackChunkName: "OrdemServicoAdd" */ './OrdemServicoAdd.vue'),
        children: [
            {
                name: 'ordem-servico-add-cliente-add',
                path: '/cliente',
                component: () => System.import(/* webpackChunkName: "ClienteAdd" */ '@/pages/cliente/ClienteAdd.vue'),
            }
        ]
    },
    {
        name: 'ordem-servico',
        path: '/ordem-servicos',
        component: () => System.import(/* webpackChunkName: "OrdemServico" */ './OrdemServico.vue')
    }

]