<template>
<div class="page">
  <SmallLoader v-if="this.smallLoader === true"></SmallLoader>
  <LoaderComponent v-if="bigLoader === true"></LoaderComponent>
  <template v-if="bigLoader === false">
  <template v-if="!post || !post.length">
    <h1>No posts for this category</h1>
  </template>
  <template v-else>
    <div class="archive" v-for="pos in post" :key="pos.id">
      <article class="article"><h2>Post #{{pos.id}}</h2>
        <p>{{pos.content}}</p>
        <router-link class="button-delete" :to="`/post/${pos.id}`">Edit</router-link>
        <button class="button-edit" v-on:click="deletePost(pos.id)">Delete</button>
        <hr>
        <hr>
      </article>
    </div>
  </template>
  </template>
</div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {mapActions, mapGetters} from "vuex";
import LoaderComponent from "@/components/LoaderComponent.vue";
import SmallLoader from "@/components/SmallLoader.vue";
export default defineComponent({
  name: "PostsByCategories",
  components: {LoaderComponent, SmallLoader},
  data(){
    return{
      bigLoader: false as boolean,
      smallLoader: false as boolean,
    }
  },
  computed: {
    ...mapGetters('posts',[
        'post'
    ])
  },
  methods: {
    ...mapActions('posts',[
        'FETCH_POSTS_BY_CATEGORIES',
        'DELETE_POST'
    ]),
    async getPosts(){
      this.bigLoader = true;
      await this.FETCH_POSTS_BY_CATEGORIES(Number.parseInt(String(this.$route.params.id))).then(()=>{
        this.bigLoader = false;
      }).catch((err) =>{
        this.bigLoader = false;
        console.log(err)
      })
    },

    async deletePost(id: number){
      this.smallLoader = true;
      await this.DELETE_POST(id);
      this.smallLoader = false;
    }
  },

  async mounted(){
    await this.getPosts();
  }
})
</script>

<style lang="less" scoped>
@desktop:   ~"only screen and (min-width: 501px) ";
@phone:    ~"only screen and (max-width: 500px)";

@mainColor: #42b983;
@blackColor: #000;
@whiteColor: #fff;
@deleteColor: #dc143c;
hr { /*dummy content*/
  height: 6px;
  border: none;
  background: rgba(0, 0, 0, 0.1);
}

hr:last-child {  /*dummy content*/
  margin-right: 60%;
}

hr.image { /*dummy content*/
  padding-bottom: 50%;
}

@media @phone {
  .page {
    padding: 1em;
    border-radius: 5px;
    text-align: center;
    background: @mainColor;
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 90%;
  }
}
@media @desktop {
  .page {
    padding: 1.5em;
    border-radius: 5px;
    text-align: center;
    background: @mainColor;
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 40%;
  }
}


.archive {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  grid-gap: 1em;
}

.article {
  padding: 1em;
  background: @whiteColor;
  box-shadow:
      0 5px 10px rgba(0, 0, 0, 0.1),
      0 20px 20px rgba(0, 0, 0, 0.05);
}
.button-delete {
  background-color: @whiteColor; /* Green */
  border: none;
  color: @blackColor;
  padding: 16px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
  border-radius: 12px;
  border: 2px solid @mainColor;
}

.button-delete:hover {
  background-color: @mainColor;
  color: @whiteColor;
}

.button-edit {
  background-color: @whiteColor; /* Green */
  border: none;
  color: @blackColor;
  padding: 16px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
  border-radius: 12px;
  border: 2px solid @mainColor;
}

.button-edit:hover {
  background-color: @deleteColor;
  color: @whiteColor;
}
</style>