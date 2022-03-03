import Posts from "@/types/Posts";
import PostState from "@/types/PostState";

export default {
    setPost(state: PostState, post: Posts[]){
        state.post = post
    }
}