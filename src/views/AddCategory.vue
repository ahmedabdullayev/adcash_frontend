<template>
<AddCategoryForm></AddCategoryForm>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import AddCategoryForm from "../components/AddCategoryForm.vue";
export default defineComponent({
  name: "AddCategory",
  components: {AddCategoryForm}
})
</script>

<style scoped>

</style>