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
    test('Show error wrong data', async () => {
        await router.push('/category/add')
        await router.isReady()
        await wrapper.setData({form: {name: ""}})
        await wrapper.find("button").trigger("click")
        expect((wrapper.vm.errorArray as []).length > 0).toBe(false)
    })
})
