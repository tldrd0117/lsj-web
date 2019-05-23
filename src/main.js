import Vue from 'vue'
import App from './App.vue'
import router from './config/RouterConfig'
import store from './store'
import StackLayout from '~/layout/StackLayout'
import AbsoluteLayout from '~/layout/AbsoluteLayout'
import moment from 'moment-timezone'

moment.locale('ko')
moment.tz.setDefault('Asia/Seoul')

Vue.config.productionTip = false

Vue.component('stack-layout', StackLayout)
Vue.component('absolute-layout', AbsoluteLayout)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
