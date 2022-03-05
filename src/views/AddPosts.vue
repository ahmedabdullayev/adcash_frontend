<template>
<div>
<AddPostForm></AddPostForm>
</div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import AddPostForm from "@/components/AddPostForm";
export default defineComponent({
  name: "AddPosts",
  components: {AddPostForm}
})
</script>

<style scoped>

</style>