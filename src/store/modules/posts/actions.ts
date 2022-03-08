import {Commit} from "vuex";
import axios, {AxiosResponse} from "axios";
import Posts from "@/types/Posts";


export default {
    FETCH_POST({commit}:{commit: Commit}, id:number) : Promise<Posts[]>{
        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                url: '/post/' + id
            })
                .then((response: AxiosResponse) => {
                    console.log(response.data)
                    commit('setPost', response.data)
                    return resolve(<Posts[]> response.data)
                }).catch((err: Error)=>{
                    reject(err)
            })
        })
    },
    FETCH_POSTS_BY_CATEGORIES({commit}: {commit: Commit}, categoryId: number) : Promise<Posts[]>{
        return new Promise<Posts[]>((resolve, reject) => {
            axios({
                method: 'get',
                url: '/posts/' + categoryId
            })
                .then((response: AxiosResponse) => {
                    commit('setPost', response.data)
                    return resolve(<Posts[]> response.data)
                }).catch((err: Error)=>{
                reject(err)
            })
        })
    },
    DELETE_POST({commit} : {commit: Commit}, id: number) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'delete',
                url: '/post/' + id
            })
                .then((response: AxiosResponse) => {
                    commit('deletePost', id)
                    return resolve(response.data)
                })
        })
    }
}