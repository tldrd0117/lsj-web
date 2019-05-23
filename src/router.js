import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
        path: '/about',
        name: 'about',
        component: () => import('./views/About.vue')
    },
    {
        path: '/:key',
        name: 'home',
        component: () => import('./views/Home.vue')
    },
    {
        path: '/:key/blog',
        component: () => import('./views/Blog.vue'),
        children: [{
            path: '',
            name: 'blog-list',
            component: () => import('./components/post/BlogList.vue')
        },
        {
            path: 'view/:id',
            name: 'blog-view',
            component: () => import('./components/post/BlogView.vue')
        },
        {
            path: 'write',
            name: 'blog-write',
            component: () => import('./components/post/BlogWrite.vue')
        }]
    },
    {
        path: '/:key/board',
        component: () => import('./views/Board.vue'),
        children: [{
            path: '',
            name: 'board-list',
            component: () => import('./components/post/BoardList.vue')
        },
        {
            path: 'view/:id',
            name: 'board-view',
            component: () => import('./components/post/BoardView.vue')
        },
        {
            path: 'write',
            name: 'board-write',
            component: () => import('./components/post/BlogWrite.vue')
        }]
    }]
})
