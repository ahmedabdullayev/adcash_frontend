<template>
  <h1>{{ $t('add_category') }}</h1>
  <div class="add_form">
      <SmallLoader v-if="this.loader === true"></SmallLoader>
      <input v-on:keydown="removeSuccessMsg" type="text" id="category_name" name="category_name" v-bind:placeholder="$t('category_placeholder')" v-model="form.name">
      <div v-if="success">
        <div class="success-msg">
          <i class="fa fa-check"></i>
          {{ $t('categoryAdd', {name : form.name}) }}
        </div>
      </div>
      <div v-if="errorArray.length">
        <div class="error-msg">
          <i class="fa fa-times-circle"></i>
          {{ $t('errorCategory') }}
        </div>
      </div>
      <button type="submit" id="btn-submit" v-on:click="submitForm()"> {{ $t('submit') }} </button>
  </div>
</template>

<i18n>
{
  "en": {
    "categoryAdd": "Category {name} was successfully added!",
    "errorCategory": "Error! Max length is 15 and min length is 1 and category can contain only letters, numbers, and underscores and no spaces!"
  },
  "et": {
    "categoryAdd" : "Postituse {name} lisamine õnnestus!",
    "errorCategory": "Viga! Maksimaalne pikkus on 15 ja minimaalne pikkus on 1 ning kategooria võib sisaldada ainult tähti, numbreid ja allkriipse, ilma tühikuteta!"
  }
}
</i18n>


<script lang="ts">
import {defineComponent} from "vue";
import Categories from "../types/Categories";
import SmallLoader from "@/components/SmallLoader.vue";
import axios from "axios";
export default defineComponent({
  name: "AddCategoryForm",
  components: {SmallLoader},
  data(){
    return{
      loader: false as boolean,
      errorArray: [] as string[],
      success: false as boolean,
      form: {} as Categories
    }
  },
  methods: {
    submitForm(){
      this.loader = true;
      axios.post('/category', this.form)
          .then(async (res) => {
            this.errorArray = []
            setTimeout(()=>{
              this.loader = false;
              this.success = true
            }, 300);
            console.warn(res)
          })
          .catch((error) =>{
            this.errorArray.push("error");
            setTimeout(()=>{
              this.loader = false;
              this.success = false;
            }, 300);
            console.warn(error)
          })
    },
    removeSuccessMsg(){
      this.success = false;
    }
  }
})
</script>

<style lang="less" scoped>
@import url('//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css');

@green: #270;
.success-msg,
.error-msg{
  margin: 10px 0;
  padding: 10px;
  border-radius: 3px 3px 3px 3px;
  color: @green;
  background-color: #DFF2BF;
}
.error-msg {
  color: #D8000C;
  background-color: #FFBABA;
}
.success-msg {
  color: @green;
  background-color: #DFF2BF;
}
@color: white;
body {
  background-color: @color;
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
.add_form{
  display: inline-block;
  width: 50%;
}
button{
  width: 100%;
  background-color: #42b983;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type=submit]:hover {
  background-color: #45a049;
}
</style>

