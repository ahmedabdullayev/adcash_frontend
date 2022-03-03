<template>
  <div class="add_form">
<div v-if="this.init">
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
<!--    <Multiselect-->
<!--        class="my_multiselect"-->
<!--        v-model="this."-->
<!--        :options="['batman', 'robin']"-->
<!--    />-->
  <textarea v-model="form.content" cols="30" rows="10" placeholder="Write something.."></textarea>
  <input type="submit" value="Submit">
  </form>
</div>
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

export default defineComponent({
  name: "Post",
  components: {Multiselect},
  data(){
    return{
      init: false as boolean,
      options: [] as Options[],
      posts: [] as Posts[],
      values: [1],
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
    ])
  },
  methods:{
    ...mapActions('posts',[
        'FETCH_POST'
    ]),
    async getPost(){
      await this.FETCH_POST(Number.parseInt(String(this.$route.params.id))).then( async () =>{
        console.log("dsad")
        this.options = this.post.categories
        this.editObj()
        this.init = true
      })
    },
    editObj(){
      this.options = this.post.categories.map((item: Categories) => {
        this.form.category_ids.push(item.id)
        return {
          value: item.id,
          label: item.name
        }
      })
    },
    submitForm(){
      console.warn(this.form)
      axios.put('/post', this.form)
          .then((res) =>{
            console.warn(res.data)
          })
          .catch((error) =>{
            console.warn(error.message)
            console.log(error.message)
          })
    },
  },
  async mounted(){
    this.form.id = Number.parseInt(String(this.$route.params.id));
    await this.getPost()

  }
})
</script>

<style scoped>
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
</style>