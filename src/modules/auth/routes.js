export default [
    {
        name: 'login',
        path: '/login',
        component: () => System.import(/* webpackChunkName: "auth" */ './pages/Login.vue')
    }
]