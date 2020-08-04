import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/test1'
    },
    {
        path: '/test1',
        name: '1',
        component: ()=>import('../pages/test1/Test1')
    },
    {
        path: '/test2',
        name: '2',
        component: ()=>import('../pages/test2/Test2')
    },
    {
        path: '/test3',
        name: '3',
        component: ()=>import('../pages/test3/Test3')
    },
    {
        path: '/test4',
        name: '4',
        component: ()=>import('../pages/test4/Test4')
    },
    {
        path: '/test5',
        name: '5',
        component: ()=>import('../pages/test5/Test5')
    },
    {
        path: '/404',
        component: ()=>import('../components/NotFind')
    },
    {
        path: '*',
        redirect: '/404'
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router;