import { createApp } from 'vue'
import App from './App.vue'
import _ from 'lodash'
import router from './router'
import store from './store'
import axios from "axios";
axios.defaults.baseURL = process.env.VUE_APP_DATA_SERVICE_URL;
createApp(App).use(store).use(_).use(router).mount('#app')
