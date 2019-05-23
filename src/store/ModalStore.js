const preventNull = val => val || ''
export default {
    namespaced: true,
    state: {
        show: false,
        name: 'modal',
        head: '',
        body: ''
    },
    getters: {
    },
    mutations: {
        setModal (state, {
            show,
            head,
            body,
            name
        }) {
            state.show = show
            state.head = preventNull(head)
            state.body = preventNull(body)
            state.name = name || 'modal'
        }
    },
    actions: {
    }
}
