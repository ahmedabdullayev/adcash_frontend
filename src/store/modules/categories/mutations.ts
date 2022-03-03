import Categories from "@/types/Categories";
import CategoryState from "@/types/CategoryState";
import _ from 'lodash';
export default {
    setAllCategories(state: CategoryState, categories: Categories[]) {
        state.categories = categories
    },
    deleteCategory(state: CategoryState, id: number){
        _.remove(state.categories, {id: id})
    },
}