<template>
<div>
  <Post></Post>
</div>
</template>

<script>
import {defineComponent} from "vue";
import Post from "../components/Post";

export default defineComponent({
  name: "PostPage",
  components: {Post}
})
</script>

<style scoped>

</style>