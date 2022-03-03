<template>
  <h1>Add a category</h1>
  <div class="add_form">
    <form v-on:submit.prevent="submitForm">
      <input type="text" id="fname" name="firstname" placeholder="Category name.." v-model="form.name">
      <div v-if="success">
        <div class="success-msg">
          <i class="fa fa-check"></i>
          Category {{form.name}} was successfully added!
        </div>
      </div>
      <div v-if="errorArray.length">
        <div class="error-msg">
          <i class="fa fa-times-circle"></i>
          Error! Max length is 15 and min length is 1!
        </div>
      </div>
      <input type="submit" value="Submit">
    </form>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import Categories from "../types/Categories";
import axios from "axios";
export default defineComponent({
  name: "AddCategoryForm",
  data(){
    return{
      errorArray: [] as string[],
      success: false as boolean,
      form: {} as Categories
    }
  },
  methods: {
    submitForm(){
      axios.post('/category', this.form)
          .then(async (res) => {
            this.errorArray = []
            this.success = true
            console.warn(res)
          })
          .catch((error) =>{
            this.errorArray.push(error);
            this.success = false;
            console.warn(error)
          })
    },
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

input[type=submit]:hover {
  background-color: #45a049;
}
</style>