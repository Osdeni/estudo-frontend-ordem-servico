export default [
    {
        name: 'home',
        path: '/',
        component: () => System.import(/* webpackChunkName: "home" */ './Home.vue')
    }
]