import './styles/main.scss'
import Vue from 'vue'
import App from './App.vue'
import createStore from './store'
import createRouter from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faHeart as faHeartS, faShoppingCart, faUser, faCartArrowDown, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartR } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faShoppingCart, faCartArrowDown, faArrowRight, faUser, faHeartS, faHeartR)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.devtools = true

const store = createStore()
const router = createRouter(store)

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app')

Response.prototype.json = async function () {
    const body = await this.text()
    return JSON.parse(body.trim())
}