<template>
  <div class="add_form">
    <h1>{{ $t('addPost') }}</h1>
  <form v-on:submit.prevent="submitForm">
    <Multiselect
        class="my_multiselect"
        v-model="form.category_ids"
        v-bind:placeholder="$t('select_categories')"
        mode="tags"
        :searchable="true"
        :createTag="true"
        :options="this.options"
    />
    <textarea v-on:keydown="removeSuccessMsg()" v-model="form.content" cols="30" rows="10" v-bind:placeholder="$t('write_smth')"></textarea>
    <SmallLoader v-if="this.loader === true"></SmallLoader>
    <div v-if="success">
      <div class="success-msg">
        <i class="fa fa-check"></i>
        {{ $t('postAdd') }}
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
import Multiselect from '@vueform/multiselect'
import axios from "axios"
import {mapActions, mapGetters} from "vuex";
import Options from "@/types/Options";
import Categories from "@/types/Categories";
import SmallLoader from "@/components/SmallLoader.vue";
export default defineComponent({
  name: "AddPostForm",
  components: {
    Multiselect, SmallLoader
  },
  data(){
    return {
      errorArray: [] as string[],
      success: false as boolean,
      loader: false as boolean,
      form:{
        content: '' as string,
        category_ids: [] as number[],
      },
      options: [] as Options[],
    }
  },
  computed: {
    ...mapGetters('categories', [
      'allCategories'
    ]),

  },
  methods:{
    ...mapActions('categories',[
      'FETCH_CATEGORIES',
    ]),
    submitForm(){
      if(this.form?.content == '' || this.form?.category_ids.length == 0){
        this.success = false;
        this.errorArray.push("error");
        return //to prevent sending request to api
      }
      this.loader = true;
      axios.post('/posts', this.form)
          .then((res) =>{
            this.errorArray = []
            setTimeout(()=>{
              this.loader = false;
              this.success = true
            }, 300);
            console.warn(res.data)
          })
          .catch((error) =>{
            this.errorArray.push(error);
            setTimeout(()=>{
              this.loader = false;
              this.success = false;
            }, 300);
            console.warn(error.data)
          })
    },
    async editObj(){
      this.options = this.allCategories?.map((item: Categories) => {
        return {
          value: item.id,
          label: item.name
        }
      })
    },
    removeSuccessMsg(){
      this.success = false;
    }
  },
  async mounted(){
    await this.FETCH_CATEGORIES();
    await this.editObj()
    console.log(this.options)
  }
})
</script>
<style src="@vueform/multiselect/themes/default.css"></style>

<style lang="less" scoped>
@import "../less-styles/validation-styles";
@import "../less-styles/post-add-edit-styles";
</style>

