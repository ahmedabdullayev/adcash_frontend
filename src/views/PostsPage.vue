<template>
<div>
  <PostsByCategories></PostsByCategories>
</div>
</template>

<script>
import {defineComponent} from "vue";
import PostsByCategories from "../components/PostsByCategories";
export default defineComponent({
  name: "PostsPage",
  components: {PostsByCategories}
})
</script>

<style scoped>

</style>