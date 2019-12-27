export default [
    {
        name: 'home',
        path: '/',
        redirect: '/ordem-servicos',
        component: () => System.import(/* webpackChunkName: "home" */ './Home.vue')
    }
]