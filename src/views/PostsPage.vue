<template>
<div>
  <h1>Category: {{ $route.params.category }}</h1>
  <PostsByCategories></PostsByCategories>
</div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import PostsByCategories from "../components/PostsByCategories";
export default defineComponent({
  name: "PostsPage",
  components: {PostsByCategories}
})
</script>

<style scoped>

</style>