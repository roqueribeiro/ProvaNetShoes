import Vue from 'vue'
import StartPage from '@/components/StartPage'

describe('StartPage.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(StartPage)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.startPage h1').textContent)
      .toEqual('Welcome to Your Vue.js App')
  })
})
