import { createApp } from 'vue'
import App from './App.vue'
import _ from 'lodash'
import router from './router'
import store from './store'
import axios from "axios";
import i18n from './i18n'
axios.defaults.baseURL = process.env.VUE_APP_DATA_SERVICE_URL;
createApp(App).use(i18n).use(i18n).use(store).use(_).use(router).mount('#app')
