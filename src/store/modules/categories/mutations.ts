import Categories from "@/types/Categories";
import CategoryState from "@/types/CategoryState";

export default {
    setAllCategories(state: CategoryState, categories: Categories[]) {
        state.categories = categories
    },
}