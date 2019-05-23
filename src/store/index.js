import Vue from 'vue'
import Vuex from 'vuex'
import MenuStore from './MenuStore'
import NavStore from './NavStore'
import ModalStore from './ModalStore'
import AuthStore from './AuthStore'
import UserStore from './UserStore'
import PostStore from './PostStore'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        menu: MenuStore,
        nav: NavStore,
        post: PostStore,
        modal: ModalStore,
        auth: AuthStore,
        user: UserStore
    }
})
