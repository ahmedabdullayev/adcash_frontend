<template>
<div>
  <Post></Post>
</div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import Post from "../components/EditPostForm";

export default defineComponent({
  name: "PostPage",
  components: {Post}
})
</script>

<style scoped>

</style>