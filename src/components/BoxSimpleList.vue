<script setup lang="ts">
  import RunBox from "./RunBox.vue";
  import { storeToRefs } from "pinia";

  import { useRunStore } from "@/stores/run"
  useRunStore().getBoxes()
  const { boxes } = storeToRefs(useRunStore());


</script>


<template>


  <div class="boxContent">
    <div class="boxContent" v-for="_box in boxes">
      <RunBox :box="_box" :runBoxFunction="useRunStore().runBox"></RunBox>
    </div>
  </div>


</template>

<style scoped>
  .boxContent{
    display: flex;
    flex-direction: row;
    /* flex-wrap: wrap; */
  }

</style>