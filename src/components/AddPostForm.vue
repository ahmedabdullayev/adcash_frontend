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
        :options="[
      { value: '1', label: 'Batman' },
      { value: '2', label: 'Robin' },
    ]"
    />
    <textarea v-model="form.content" cols="30" rows="10" placeholder="Write something.."></textarea>
    <input type="submit" value="Submit">
  </form>
</div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import Multiselect from '@vueform/multiselect'
import axios from "axios"
export default defineComponent({
  name: "AddPostForm",
  components: {
    Multiselect
  },
  data(){
    return {
      form:{
        content: '' as string,
        category_ids: [] as number[],
      }
    }
  },
  methods:{
    submitForm(){
      axios.post('http://127.0.0.1:8000/api/posts', this.form)
          .then((res) =>{
            console.warn(res.data)
          })
          .catch((error) =>{
            console.log(error.data)
            return Promise.reject(error)
          })
    },
  }
})
</script>
<style src="@vueform/multiselect/themes/default.css"></style>

<style scoped>
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
  -webkit-box-shadow: 0 0 10px #444;
  -moz-box-shadow: 0 0 10px #444;
  box-shadow: 0 0 10px #444;
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

