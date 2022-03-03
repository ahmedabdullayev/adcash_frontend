<template>
 <h1>Categories</h1>
  <Categories></Categories>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Categories from "@/components/Categories.vue";
export default defineComponent({
  name: 'Home',
  components: {Categories},
});
</script>
