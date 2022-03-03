import {Commit} from "vuex";
import Categories from "@/types/Categories";
import axios, {AxiosResponse} from "axios";

export default {
    FETCH_CATEGORIES({commit}: {commit: Commit}) : Promise<Categories[]> {
        return new Promise<Categories[]>((resolve, reject) => {
            axios({
                method: 'get',
                url: "http://localhost:8000/api/categories"
            })
                .then((response: AxiosResponse) =>{
                    commit("setAllCategories", response.data)
                    return resolve(<Categories[]> response.data)
                })
                .catch((err: Error)=>{
                    reject(err)
                })
        })
    }
}