import { createStore } from 'vuex'
import categories from "./modules/categories"
import posts from "./modules/posts"
export default createStore({
  modules: {
    categories,
    posts
  }
})
