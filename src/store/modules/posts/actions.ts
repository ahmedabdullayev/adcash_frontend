import {Commit} from "vuex";
import axios, {AxiosResponse} from "axios";
import Posts from "@/types/Posts";


export default {
    FETCH_POST({commit}:{commit: Commit}, id:number) : Promise<Posts[]>{
        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                url: 'http://localhost:8000/api/post/' + id
            })
                .then((response: AxiosResponse) => {
                    console.log(response.data)
                    commit('setPost', response.data)
                    return resolve(<Posts[]> response.data)
                })
        })
    },
    FETCH_POSTS_BY_CATEGORIES({commit}: {commit: Commit}, categoryId: number) : Promise<Posts[]>{
        return new Promise<Posts[]>((resolve, reject) => {
            axios({
                method: 'get',
                url: 'http://127.0.0.1:8000/api/posts/' + categoryId
            })
                .then((response: AxiosResponse) => {
                    commit('setPost', response.data)
                    return resolve(<Posts[]> response.data)
                })
        })
    }
}