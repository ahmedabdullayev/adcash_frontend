<template>
<div class="wrapper">
  <div class="a" v-for="category in allCategories" :key="category.id" >
    <h2>{{ category.name }}</h2>
    <router-link class="rout" :to="`/posts/${category.name}/${category.id}`">{{ category.name }}</router-link> |
    <a v-on:click="deleteCategory(category.id)" class="rout">Delete</a>
  </div>
</div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {mapActions, mapGetters} from "vuex";
import axios from "axios";

export default defineComponent({
  name: "Categories",
  data(){
    return{

    }
  },
  computed: {
    ...mapGetters('categories', [
        'allCategories'
    ])
  },
  methods: {
    ...mapActions('categories',[
        'FETCH_CATEGORIES',
        'DELETE_CATEGORY'
    ]),
    async deleteCategory(id: number){
     await this.DELETE_CATEGORY(id)
    }
  },
  async mounted(){
    try {
      let fetch = await this.FETCH_CATEGORIES();
      console.log(fetch)
    } catch (e){
      console.error("Request failed, please refresh page")
    }
  }
})
</script>

<style lang="less" scoped>
@desktop:   ~"only screen and (min-width: 845px)";
@desktopMedium: ~"only screen and (max-width: 845px) and (min-width: 600px)";
@desktopSmall: ~"only screen and (max-width: 601px) and (min-width: 500px)";
@phone:    ~"only screen and (max-width: 501px)";

@borderColor: #4CAF50;

@media @phone {
  .wrapper {
    padding: 0 calc(40% - 110px);
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-auto-rows: minmax(50px, auto);
    grid-gap: 5px;
  }
}
  @media @desktop {
    .wrapper {
      padding: 0 calc(30% - 270px);
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-auto-rows: minmax(50px, auto);
      grid-gap: 5px;
    }
  }
    @media @desktopMedium {
      .wrapper {
        padding: 0 calc(40% - 270px);
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-auto-rows: minmax(50px, auto);
        grid-gap: 5px;
      }
    }
      @media @desktopSmall {
        .wrapper {
          padding: 0 calc(70% - 330px);
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-auto-rows: minmax(50px, auto);
          grid-gap: 5px;
        }
      }

        .a {
          margin: 0 3px;
          color: #1195c9;
          border: 3px solid @borderColor;
          background: white;
          padding-bottom: 10px;
          border-radius: 4px;
          cursor: pointer;
          font-weight: bold;
        }
        .rout {
          border: 5px solid @borderColor;
          background-color: #42b983;
          border-radius: 4px;
          color: white;

          position: relative;
          text-decoration: none;
        }

        .rout:hover {
          background-color: #227700;
        }

        .rout:active {
          box-shadow: none;
          top: 5px;
        }
</style>