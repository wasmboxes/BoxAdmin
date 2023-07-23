import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useBoxSimpleStore = defineStore('boxSimple', () => {
  const boxes = ref(new Array<BoxSimple>())
  
  async function getBoxes(){
    const res = await fetch('http://0.0.0.0:8080/boxSimple');
    const resp = await res.json();
    console.log(resp)
    // const { data }: { data: Array<BoxSimple> } = resp
    boxes.value = resp
  }


  return { boxes, getBoxes }
})


export interface BoxSimple {
  Id: number
  Name: string
  ErrorId: boolean
}