<template>
  <template v-if="notFound === false">
    <div class="page">
      <SmallLoader v-if="this.smallLoader === true"></SmallLoader>
      <LoaderComponent v-if="bigLoader === true"></LoaderComponent>
      <template v-if="bigLoader === false">
      <template v-if="!filteredPost('') || !filteredPost('').length">
        <h1>{{ $t('no_posts') }}</h1>
      </template>
      <template v-else>
        <input type="text" id="post" name="post" v-bind:placeholder="$t('searchPost')" v-on:keyup="filterPosts()" v-model="search">
        <div class="archive" v-for="pos in posts" :key="pos.id">
          <article class="article"><h2>Post #{{pos.id}}</h2>
            <p>{{pos.content}}</p>
            <router-link class="button-delete" :to="`/post/${pos.id}`">{{ $t('edit') }}</router-link>
            <button class="button-edit" v-on:click="deletePost(pos.id)">{{ $t('delete') }}</button>
            <hr>
            <hr>
          </article>
        </div>
      </template>
      </template>
    </div>
  </template>
  <template v-else>
    <notfound v-bind:msg="$t('notFoundCategory')"></notfound>
  </template>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {mapActions, mapGetters} from "vuex";
import LoaderComponent from "@/components/LoaderComponent.vue";
import SmallLoader from "@/components/SmallLoader.vue";
import Posts from "@/types/Posts";
import notfound from "@/components/notfound.vue";
export default defineComponent({
  name: "PostsByCategories",
  components: {LoaderComponent, SmallLoader, notfound},
  data(){
    return{
      posts: [] as Posts[],
      search: "" as string,
      notFound: false as boolean,
      bigLoader: false as boolean,
      smallLoader: false as boolean,
    }
  },
  computed: {
    ...mapGetters('posts',[
        'filteredPost'
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
        this.posts = this.filteredPost('');
        setTimeout(()=>{ // for smooth and nice loader
          this.bigLoader = false;
        }, 200);
      }).catch((err) =>{
        this.notFound = true;
        console.log(err)
      })
    },
    filterPosts(){
      this.posts = this.filteredPost(this.search)
    },

    async deletePost(id: number){
      this.smallLoader = true;
      await this.DELETE_POST(id);
      this.posts = this.filteredPost('');
      this.search = "";
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
  background: rgba(0, 0, 0, 0.4);
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
input[type=text], select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
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