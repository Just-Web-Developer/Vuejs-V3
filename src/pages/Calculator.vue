<template>
  <section class="flex w-full">
    <div class="m-auto">
      <PageName>
        Calculator
      </PageName>
      <p class="text-3xl text-right mt-10 mb-3 w-56 overflow-x-auto overflow-y-hidden h-12"
         style="direction: ltr; white-space: nowrap">
        {{prevNum}}{{selectedOperation}}{{currentNum}}
      </p>
      <div class=" grid grid-cols-4 gap-1">
        <button v-for="elem in elements" :key="elem" @click="pressed(elem)" class="p-3 border rounded shadov w-14 h-14">
          {{ elem }}
        </button>
      </div>
    </div>
  </section>

</template>

<script>
import {ref} from 'vue'
import useWindowEvent from '@/utilities/composition/useWindowEvent'
import PageName from "@/components/PageName/PageName";

export default {
name: "Calculator",
  components:{PageName},
  setup(){
    const operations = ["+", '-', '*', '/']
    const numbers = ["0","1","2","3","4","5","6","7","8","9"]
    const currentNum = ref('')
    const prevNum = ref('')
    const selectedOperation = ref('')
    const elements = ["1","2","3","+","4","5","6",'-',"7","8","9",'*','C','0','=','/']

    function pressed(value){
      if (value === '=' || value === 'Enter') calculate()
      else if (operations.includes(value)) applyOperation(value)
      else if (value === 'C' || value === "c") clear()
      else if (numbers.includes(value)) appendNumber(value)
    }

    function appendNumber(value) {
      currentNum.value += value
    }

    function applyOperation(operation){
      calculate()
      if(selectedOperation.value === ''){
        prevNum.value = currentNum.value
        currentNum.value = ''
      }
      selectedOperation.value = operation
    }

    function calculate(){
      if(selectedOperation.value === "*") multiply()
      else if(selectedOperation.value === "/") divide()
      else if(selectedOperation.value === "+") sum()
      else if(selectedOperation.value === "-") subtract()
      prevNum.value = ''
      selectedOperation.value = ''
    }

    function multiply(){
      currentNum.value = prevNum.value * currentNum.value
    }

    function divide(){
      currentNum.value = prevNum.value / currentNum.value
    }

    function sum(){
      currentNum.value = +prevNum.value + +currentNum.value
    }

    function subtract(){
      currentNum.value = prevNum.value - currentNum.value
    }

    function clear(){
      currentNum.value = ''
      prevNum.value = ''
      selectedOperation.value = ''
    }

    const handleKeyDown = (e) => pressed(e.key)
    useWindowEvent('keydown',handleKeyDown)



    return {pressed,currentNum,prevNum,selectedOperation, numbers,elements}
  }
}
</script>

<style lang="scss" scoped>

</style>