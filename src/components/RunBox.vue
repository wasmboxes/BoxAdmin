<script setup lang="ts">
import type { Box, RunFunctionCallback } from '@/stores/run';
import RunFunction from '@/components/RunFunction.vue'

defineProps<{
  box: Box,
  runBoxFunction: RunFunctionCallback
}>()
</script>


<template>

    <div class="runBox">
        <h1>Box Id : {{ box.Id }}</h1>
        <h1>Box Name : {{ box.Name }}</h1>

        <div v-for="fun in box.Functions">
            <RunFunction :func="fun" :box-id="box.Id" :runBoxFunction="runBoxFunction"></RunFunction>
        </div>
    </div>

</template>

<style scoped>
    .runBox{
        margin: 10px;
        border: 1px solid beige;
        padding: 10px;
    }
</style>