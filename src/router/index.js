import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'
import StartPage from '@/components/StartPage'

Vue.use(Router)
Vue.use(Vuex)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'StartPage',
      component: StartPage
    }
  ]
})
