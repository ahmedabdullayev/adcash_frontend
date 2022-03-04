import {shallowMount} from "@vue/test-utils";
import AddPostForm from "@/components/AddPostForm.vue";
import store from '@/store';
import router from "@/router";

store.dispatch = jest.fn(() => Promise.resolve())
const wrapper = shallowMount(AddPostForm, {
    global:{
        plugins: [store, router],
        mocks: {
            $t: jest.fn(),
        }
    }
});

describe("AddPostFormComponent", ()=> {
    test("Show form", async () => {
        await router.push('/')
        await router.isReady()

        await wrapper.vm.$nextTick()
        expect(wrapper.find(".add_form").exists()).toBe(true)
    })
    test("Show multiselect", async () => {
        await router.push('/')
        await router.isReady()

        await wrapper.vm.$nextTick()
        expect(wrapper.find(".my_multiselect").exists()).toBe(true)
    })
    test("Show submit button", async () => {
        await router.push('/')
        await router.isReady()

        await wrapper.vm.$nextTick()
        expect(wrapper.find("input[type=submit]").exists()).toBe(true)
    })
})