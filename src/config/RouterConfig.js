import router from '../router'
import store from '../store'

router.beforeEach((to, from, next) => {
    if (to.path === '/blog' || to.path === '/board') {
        next(Date.now() + to.path)
        return
    }
    if (!to.params.key) {
        next(Date.now() + to.path)
        return
    }
    if (!store.getters['menu/isInKey'](to.params.key)) {
        const isBlog = to.name.startsWith('blog')
        const isBoard = to.name.startsWith('board')
        if (isBlog || isBoard) {
            store.dispatch('post/addPost', {
                key: to.params.key,
                type: `${isBlog ? 'blog' : ''}${isBoard ? 'board' : ''}`,
                id: to.params.id
            })
        }
        store.dispatch('menu/newView', {
            path: to.path,
            key: to.params.key,
            name: to.name
        })
    }
    store.dispatch('menu/selectView', to.params.key)
    store.commit('menu/setCurViewName', to.name)

    next()
})

router.afterEach((to, from) => {
})

export default router
