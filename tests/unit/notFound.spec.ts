import { shallowMount } from '@vue/test-utils'
import notfound from '@/components/notfound.vue'
import i18n from "@/i18n";

describe('HelloWorld.vue', () => {
    it('renders props.msg when passed', () => {
        const i18nn = i18n

        const msg = 'new message'
        const wrapper = shallowMount(notfound, {
            props: { msg }
            ,global: {
                plugins: [i18nn]
            }
        })
        console.log(wrapper.text())
        expect(wrapper.text()).toMatch(msg)
    })
})