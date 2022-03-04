import { shallowMount } from '@vue/test-utils'
import store from '@/store'
import Categories from "@/components/Categories.vue";
import router from "@/router";

store.dispatch = jest.fn(() => Promise.resolve())
const  wrapper = shallowMount(Categories,{
  global: {
    plugins: [router, store],
    mocks: {
      $store: store,
      $route: router,
      $t: jest.fn()
    }
  }
})

describe('Categories', () => {
  test('Get categories', async () => {
    await router.push('/')
    await router.isReady()
    const body = [{id: 1, name: "Cars"}]
    wrapper.vm.$store.commit('categories/setAllCategories', body)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.allCategories).toStrictEqual(body)
    expect(wrapper.text()).toMatch("Cars")
    expect(wrapper.vm.allCategories).not.toBe(null)
  })

})
