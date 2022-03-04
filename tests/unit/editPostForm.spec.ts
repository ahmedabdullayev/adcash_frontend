import {shallowMount} from "@vue/test-utils";
import Vue from 'vue'
import VueRouter from 'vue-router'
import EditPostForm from "@/components/EditPostForm.vue";
import store from '@/store';
import router from "@/router";
import Posts from "@/types/Posts";

store.dispatch = jest.fn(() => Promise.resolve())
const  wrapper = shallowMount(EditPostForm,{
    global: {
        plugins: [router, store],
        mocks: {
            $store: store,
            $route: router,
            $t: jest.fn()
        }
    }
})

describe('Edit post form', () => {
    test('Get a post', async () => {
        await router.push('/post/1')
        await router.isReady()
        const categories = [{id:15, name: "Cars"}, {id:16, name: "Football"}]
        const post = [{id:1, content: "Post content", categories_id : categories}] as Posts[]
        const body = [post]
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        wrapper.vm.$store.commit('posts/setPost', body)
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.post).toStrictEqual(body)
        await wrapper.vm.$nextTick()
        expect(wrapper.text()).toMatch("Edit post #")
        expect(wrapper.vm.post).not.toBe(null)
    })

})