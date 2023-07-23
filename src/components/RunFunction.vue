<script setup lang="ts">
import type { BoxFunction, RunBoxRequest, FunctionParameter, RunFunctionCallback } from '@/stores/run';
import { reactive, ref, toRefs, type Ref, watch } from 'vue';

  const props = defineProps<{
    func: BoxFunction,
    boxId: number,
    runBoxFunction: RunFunctionCallback
  }>()
  const { func } = toRefs(props);


  let inputLst : Ref<any[]> = ref([]);
  let returnLst : Ref<string> = ref("");

  for(let i = 0; i < func.value.ArgCount; i++){
    console.log("Pushing")
    inputLst.value.push("");
  }

  console.log(inputLst.value)
  console.log(func.value)

  function runFunction(){
    console.log("Running function")  
    console.log(inputLst.value)  

    let params : FunctionParameter[] = []

    inputLst.value.forEach( v => params.push(
     {
      Ptype: 1,
      Value: Number(v)
     } 
    ))

    let runReq : RunBoxRequest = {
      BoxId: props.boxId,
      FunctionName: props.func.Name,
      Params: params
    }

    console.log(runReq)

    props.runBoxFunction(runReq).then(r=>returnLst.value=r.Response.reduce((n, p)=> p+ " " + n))

  } 

  

</script>



<template>
    <div class="runFunction">
      <h1>Function : {{ func.Name }}</h1>

      <div class="inputParameters">
        <h3>Input : </h3>

        <div v-for="(cm, ix) in inputLst" :key="ix">
          <input type="any" v-model="inputLst[ix]"/>
        </div>

      </div>

      <button @click="runFunction">Run Function</button>

      <div class="outputReturn">
        <h3>Return : {{ returnLst }}</h3>
      </div>
  </div>
</template>

<style>
  .runFunction{
    display: flex;
    align-content:center;
    flex-direction: column;
    margin: 10px;
    border: 1px solid beige;
    padding: 10px;
    align-content: center;
  }

  .outputReturn, .inputParameters{
    min-height: 28px;
    margin: 10px;
    border: 1px solid beige;
    padding: 10px;
    align-content: center;
  }

</style>