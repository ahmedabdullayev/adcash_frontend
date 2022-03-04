import { shallowMount } from '@vue/test-utils'
import store from '@/store'
import AddCategoryForm from "@/components/AddCategoryForm.vue";
import router from "@/router";
import Categories from "@/types/Categories";

store.dispatch = jest.fn(() => Promise.resolve())
const  wrapper = shallowMount(AddCategoryForm,{
    global: {
        plugins: [router, store],
        mocks: {
            $store: store,
            $route: router,
            $t: jest.fn()
        }
    }
})

describe('Category form', () => {
    test("Check for html elements", async ()=> {
        await router.push('/')
        await router.isReady()

        expect(wrapper.find(".add_form").exists()).toBe(true)
        expect(wrapper.find("#category_name").exists()).toBe(true)
    })
    test('Show error when wrong data', async () => {
        await router.push('/')
        await router.isReady()
        await wrapper.setData({form: {name: ""}})
        const wrapperFind = wrapper.find("#btn-submit")
        const spy = jest.spyOn(wrapper.vm, 'submitForm')
        wrapperFind.trigger('click')
        await wrapper.vm.$nextTick()
        expect(spy).toHaveBeenCalled()
        expect((wrapper.vm.errorArray as []).length > 0).toBe(false)
        jest.restoreAllMocks()
    })
})
