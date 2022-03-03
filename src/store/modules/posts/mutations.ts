import Posts from "@/types/Posts";
import PostState from "@/types/PostState";
import CategoryState from "@/types/CategoryState";
import _ from "lodash";

export default {
    setPost(state: PostState, post: Posts[]){
        state.post = post
    },
    deletePost(state: PostState, id: number){
        _.remove(state.post, {id: id})
    },
}