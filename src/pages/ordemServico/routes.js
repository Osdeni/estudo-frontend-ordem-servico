export default [
    {
        name: 'ordem-servico',
        path: '/ordem-servicos',
        component: () => System.import(/* webpackChunkName: "OrdemServico" */ './OrdemServico.vue')
    }
]