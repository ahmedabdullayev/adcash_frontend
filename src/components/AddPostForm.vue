<template>
  <div class="add_form">
  <form v-on:submit.prevent="submitForm">
<!--    <select v-model="form.category_ids" name="cars" id="cars" multiple>-->
<!--      <option value="1">Volvo</option>-->
<!--      <option value="2">Saab</option>-->
<!--      <option value="opel">Opel</option>-->
<!--      <option value="audi">Audi</option>-->
<!--    </select>-->
    <Multiselect
        class="my_multiselect"
        v-model="form.category_ids"
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
        Post was successfully added!
      </div>
    </div>
    <div v-if="errorArray.length">
      <div class="error-msg">
        <i class="fa fa-times-circle"></i>
        Error! Post max length is 140 characters and min length is 1 character! <br> And please choose category for this post!
      </div>
    </div>
    <input type="submit" value="Submit">
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
    ])
  },
  methods:{
    ...mapActions('categories',[
      'FETCH_CATEGORIES',
    ]),
    submitForm(){
      this.loader = true;
      axios.post('/posts', this.form)
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
@green: #270;
@error: #FFBABA;
.my_multiselect{
  width: 100%;
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
  -webkit-box-shadow: 0 0 5px #444;
  -moz-box-shadow: 0 0 5px #444;
  box-shadow: 0 0 5px #444;
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
.add_form{
  display: inline-block;
  width: 50%;
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

