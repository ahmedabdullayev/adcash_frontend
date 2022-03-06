<template>

  <div id="nav">
    <div class="row">
      <div class="col-sm-3 col-md-3 col-lg-2"></div>
      <div class="col-sm-6 col-md-6 col-lg-8">
    <router-link to="/">{{$t('home')}}</router-link> |
    <router-link to="/post/add">{{$t('addPost')}}</router-link> |
    <router-link to="/category/add">{{$t('add_category')}}</router-link>
      </div>
      <div class="col-sm-3 col-md-3 col-lg-2">
    <Header></Header>
      </div>
    </div>
  </div>

  <router-view/>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import Header from "@/components/Header.vue";
export default defineComponent({
  components: {Header},
  data(){
    return{
    }
  },
  methods: {
    checkLang(){
      if(!localStorage.getItem("lang")){
        localStorage.setItem("lang", "en")
      }
      this.$i18n!.locale = localStorage.getItem("lang") || "en";
    }
  },
  watch:{
    $route: function(to, from){
      this.checkLang()
    }
  },
});
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
