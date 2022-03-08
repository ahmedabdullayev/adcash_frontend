<template>
  <div class="my-alert">
  <div class="alert alert-danger d-flex align-items-center" role="alert">
    <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
    <div class="notfound-text">
      <h4 class="alert-heading">404 | {{ t('notfound') }}</h4>
      <hr>
      <p>{{msg}}</p>
    </div>
  </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {useI18n} from "vue-i18n";

export default defineComponent({
  name: "notfound",
  props: {
    msg: String,
  },
  data(){
    const { t } = useI18n()
    return{
      t,
    }
  }
})
</script>

<style lang="less" scoped>
.my-alert{
  margin: auto;
  text-align: center;
  width: 50%;
}
.notfound-text{
  margin: auto;
}
</style>