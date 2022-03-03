import CategoryState from "@/types/CategoryState";
import actions from "@/store/modules/categories/actions";
import getters from "@/store/modules/categories/getters";
import mutations from "@/store/modules/categories/mutations";

export default {
    namespaced: true,
    state: <CategoryState>{},
    getters,
    mutations,
    actions
}