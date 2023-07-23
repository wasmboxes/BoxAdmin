import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useRunStore = defineStore('run', () => {
  const boxes = ref(new Array<Box>())
  
  async function getBoxes(){
    const res = await fetch('http://0.0.0.0:8080/run');
    const resp = await res.json();
    console.log(resp)
    // const { data }: { data: Array<BoxSimple> } = resp
    boxes.value = resp
  }

  async function runBox(runReq:RunBoxRequest) {

    let req = `{"BoxId":1,"FunctionName":"fib","Params":[{"Value":1,"Ptype":1}]}`

    const rawResponse = await fetch('http://0.0.0.0:8080/run', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(runReq)
    });
    const content = await rawResponse.json();
  
    console.log(content);
    return content;
  }


  return { boxes, getBoxes, runBox }
})

export type Boxes = Box[]

export type RunFunctionCallback = (runReq:RunBoxRequest) => Promise<RunBoxResponse>;

export interface Box {
  Id: number
  Name: string
  FunctionCount: number
  ModuleCount: number
  Functions: BoxFunction[]
  ErrorId: boolean
}

export interface BoxFunction {
  Name: string
  Index: number
  ArgCount: number
  RetCount: number
  Types: number[]
}

export interface RunBoxRequest{
  BoxId: number
  FunctionName: string
  Params: FunctionParameter[]
}

export interface FunctionParameter{
  Value: any
  Ptype: number
}

export interface RunBoxResponse {
  Response: any[]
  Error: number
  ErrorDesc: string
}