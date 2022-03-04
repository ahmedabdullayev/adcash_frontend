import PostState from "@/types/PostState";
import Posts from "@/types/Posts";
import _ from 'lodash';

export default {
    filteredPost: (state: PostState) => (word: string) : Posts[] =>{
        return _.values(_.pickBy(state.post, article => article.content?.toLocaleLowerCase().includes(word.toLowerCase())));
    },
    post: (state: PostState) : Posts[] => {
        return state.post;
    }
}