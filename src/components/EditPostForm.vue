<template>

  <div class="add_form">
    <h1>Edit post #{{this.$route.params?.id}}</h1>
    <LoaderComponent v-if="this.init === false"></LoaderComponent>
  <form v-on:submit.prevent="submitForm">
  <Multiselect
      class="my_multiselect"
      v-model="form.category_ids"
      :values="this.values"
      placeholder="Select one or more categories"
      mode="tags"
      :searchable="true"
      :createTag="true"
      :options="this.options"
  />
  <textarea v-model="form.content" cols="30" rows="10" placeholder="Write something.."></textarea>
    <SmallLoader v-if="this.loader === true"></SmallLoader>
    <div v-if="success">
      <div class="success-msg">
        <i class="fa fa-check"></i>
        Post was successfully updated!
      </div>
    </div>
    <div v-if="errorArray.length">
      <div class="error-msg">
        <i class="fa fa-times-circle"></i>
        Error! Post max length is 140 characters and min length is 1 character!<br> And please choose category for this post!
      </div>
    </div>
  <input type="submit" value="Submit">
  </form>
</div>

</template>

<script lang="ts">
import {defineComponent} from "vue";
import Posts from "../types/Posts";
import Multiselect from '@vueform/multiselect'
import {mapActions, mapGetters} from "vuex";
import axios from "axios";
import Options from "@/types/Options";
import Categories from "@/types/Categories";
import LoaderComponent from "@/components/LoaderComponent.vue";
import SmallLoader from "@/components/SmallLoader.vue";
export default defineComponent({
  name: "EditPostForm",
  components: {Multiselect, LoaderComponent, SmallLoader},
  data(){
    return{
      init: false as boolean,
      loader: false as boolean,
      options: [] as Options[],
      posts: [] as Posts[],
      success: false as boolean,
      errorArray: [] as string[],
      form:{
        category_ids: [] as number[],
        content: '' as string,
        id: null as  number | null,
      },
    }
  },
  computed:{
    ...mapGetters('posts',[
        'post'
    ]),
    ...mapGetters('categories', [
      'allCategories'
    ])
  },
  methods:{
    ...mapActions('posts',[
        'FETCH_POST'
    ]),
    ...mapActions('categories',[
      'FETCH_CATEGORIES',
    ]),
    async getPost(){
      await this.FETCH_POST(Number.parseInt(String(this.$route.params?.id))).then( async () =>{
        this.editObj()
        this.init = true
      })
    },
    editObj(){
      this.options = this.allCategories?.map((item: Categories) => {
        return {
          value: item?.id,
          label: item.name
        }
      });
     this.post?.categories.forEach((item : Categories) => {
       this.form.category_ids.push(item?.id);
     });
    this.form.content = this.post?.content;
    },
    submitForm(){
      this.loader = true;
      axios.put('/post', this.form)
          .then((res) =>{
            this.errorArray = []
            this.loader = false;
            this.success = true
            console.warn(res.data)
          })
          .catch((error) =>{
            this.errorArray.push(error);
            this.loader = false;
            this.success = false;
            console.warn(error.message)
            console.log(error.message)
          });
    },
  },
  async mounted(){
    this.form.id = Number.parseInt(String(this.$route.params?.id));
    await this.FETCH_CATEGORIES();
    await this.getPost()

  }
});
</script>

<style lang="less" scoped>

@green: #270;
@error: #FFBABA;
.add_form{
  display: inline-block;
  width: 50%;
}
textarea {
  margin-top: 20px;
  height: 150px;
  width: 100%;
  box-sizing: border-box;
  padding: 15px;
  border: 1px solid #fff;
  -webkit-border-radius: 6px;
  -khtml-border-radius: 6px;
  -moz-border-radius: 6px;
  border-radius: 6px;
  -webkit-box-shadow: 0 0 10px #444;
  -moz-box-shadow: 0 0 10px #444;
  box-shadow: 0 0 10px #444;
}
input[type=submit] {
  width: 100%;
  background-color: #42b983;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.error-msg{
  margin-top: 5px;
  background-color: @error;
  border: 2px solid red;
  padding: 5px;
  border-radius: 25px;
}
.success-msg{
  margin-top: 5px;
  background-color: @green;
  color: white;
  border: 2px solid @green;
  padding: 5px;
  border-radius: 25px;
}
</style>