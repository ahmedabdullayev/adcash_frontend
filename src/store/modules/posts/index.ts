import PostState from "@/types/PostState";
import getters from "@/store/modules/posts/getters";
import mutations from "@/store/modules/posts/mutations";
import actions from "@/store/modules/posts/actions";


export default {
    namespaced: true,
    state: <PostState>{},
    getters,
    mutations,
    actions
}