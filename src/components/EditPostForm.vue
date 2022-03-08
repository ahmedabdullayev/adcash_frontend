<template>

  <div class="add_form">
    <h1>{{$t('editPost')}} #{{this.$route.params?.id}}</h1>
    <LoaderComponent v-if="this.init === false"></LoaderComponent>
  <form v-on:submit.prevent="submitForm">
  <Multiselect
      class="my_multiselect"
      v-model="form.category_ids"
      :values="this.values"
      v-bind:placeholder="$t('select_categories')"
      mode="tags"
      :searchable="true"
      :createTag="true"
      :options="this.options"
  />
  <textarea v-model="form.content" cols="30" rows="10" v-bind:placeholder="$t('write_smth')"></textarea>
    <SmallLoader v-if="this.loader === true"></SmallLoader>
    <div v-if="success">
      <div class="success-msg">
        <i class="fa fa-check"></i>
        {{ $t('postUpdate') }}
      </div>
    </div>
    <div v-if="errorArray.length">
      <div class="error-msg">
        <i class="fa fa-times-circle"></i>
        {{ $t('errorPost') }}
      </div>
    </div>
  <input type="submit" v-bind:value="$t('submit')">
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
        setTimeout(()=>{
          this.init = true;
        }, 300);
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
      axios.put('/post/'+ this.form?.id, this.form)
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
@import "../less-styles/validation-styles";

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

</style>