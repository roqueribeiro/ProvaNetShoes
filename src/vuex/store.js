import Vue from 'vue'
import Vuex from 'Vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartWindowState: false,
    productsInCart: []
  },
  getters: {
    cartWindowState: state => state.cartWindowState,
    productsInCart: state => state.productsInCart
  },
  mutations: {
    addToCart: (state, payload) => {
      state.productsInCart.unshift(payload)
    },
    removeFromCart: (state, payload) => {
      state.productsInCart.splice(state.productsInCart.indexOf(payload), 1)
    },
    showCartWindow: (state) => {
      state.cartWindowState = true
    },
    hideCartWindow: (state) => {
      state.cartWindowState = false
    }
  }
})
