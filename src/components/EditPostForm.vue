<template>
  <template v-if="notFound === false">
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
  <template v-else>
    <notfound v-bind:msg="$t('notFoundPost')"></notfound>
  </template>
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
import notfound from "@/components/notfound.vue";
export default defineComponent({
  name: "EditPostForm",
  components: {Multiselect, LoaderComponent, SmallLoader, notfound},
  data(){
    return{
      init: false as boolean,
      loader: false as boolean,
      options: [] as Options[],
      posts: [] as Posts[],
      success: false as boolean,
      notFound: false as boolean,
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
        setTimeout(()=>{// for smooth and nice loader
          this.init = true;
        }, 200);
      }).catch(() => {
        this.init = true;
        this.notFound = true;
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
      if(this.form?.content == '' || this.form?.category_ids.length == 0){
        this.success = false;
        this.errorArray.push("error");
        return //to prevent sending request to api
      }
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
@import "../less-styles/post-add-edit-styles";
</style>