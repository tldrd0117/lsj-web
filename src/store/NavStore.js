export default {
    namespaced: true,
    state: {
        backShow: false,
        removeShow: false,
        editShow: false,
        editCompleteShow: false,
        progressShow: false
    },
    getters: {
    },
    mutations: {
        setShow (state, { backShow, removeShow, editShow, editCompleteShow }) {
            state.backShow = backShow
            state.removeShow = removeShow
            state.editShow = editShow
            state.editCompleteShow = editCompleteShow
        },
        setProgressShow (state, isShow) {
            state.progressShow = isShow
        }
    },
    actions: {
    }
}
