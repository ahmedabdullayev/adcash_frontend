import PostState from "@/types/PostState";
import Posts from "@/types/Posts";


export default {
    post: (state: PostState) : Posts[] => {
        return state.post;
    }
}