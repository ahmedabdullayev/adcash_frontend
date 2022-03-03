import {Commit} from "vuex";
import Categories from "@/types/Categories";
import axios, {AxiosResponse} from "axios";

export default {
    FETCH_CATEGORIES({commit}: {commit: Commit}) : Promise<Categories[]> {
        return new Promise<Categories[]>((resolve, reject) => {
            axios({
                method: 'get',
                url: "/categories"
            })
                .then((response: AxiosResponse) =>{
                    commit("setAllCategories", response.data)
                    return resolve(<Categories[]> response.data)
                })
                .catch((err: Error)=>{
                    reject(err)
                })
        })
    },
    DELETE_CATEGORY({commit}: {commit: Commit}, id:number) : Promise<Categories[]> {
        return new Promise<Categories[]>((resolve, reject) => {
            axios({
                method: 'delete',
                url: '/category/'+id
            })
                .then((response : AxiosResponse) =>{
                    commit('deleteCategory', id);
                    return resolve(<Categories[]> response.data)
                })
                .catch((err: Error) => {
                    reject(err)
                })
        })
    },
}