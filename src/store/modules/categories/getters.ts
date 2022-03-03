import CategoryState from "@/types/CategoryState";
import Categories from "@/types/Categories";

export default {
    allCategories(state: CategoryState): Categories[] {
        return state.categories
    }
}