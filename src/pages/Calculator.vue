<template>
  <section class="flex w-full">
    <div class="m-auto">
      <PageName>
        Calculator
      </PageName>
      <p class="text-3xl text-right mt-10 mb-3 w-40 overflow-x-auto overflow-y-hidden h-12" style="direction: ltr; white-space: nowrap">{{prevNum}}{{selectedOperation}}{{currentNum}}</p>
      <div class=" grid grid-cols-4 gap-1">
        <button @click="pressed('1')" class="p-2 border rounded shadov w-10 h-10">1</button>
        <button @click="pressed('2')" class="p-2 border rounded shadov w-10 h-10">2</button>
        <button @click="pressed('3')" class="p-2 border rounded shadov w-10 h-10">3</button>
        <button @click="pressed('+')" class="p-2 border rounded shadov w-10 h-10">+</button>
        <button @click="pressed('4')" class="p-2 border rounded shadov w-10 h-10">4</button>
        <button @click="pressed('5')" class="p-2 border rounded shadov w-10 h-10">5</button>
        <button @click="pressed('6')" class="p-2 border rounded shadov w-10 h-10">6</button>
        <button @click="pressed('-')" class="p-2 border rounded shadov w-10 h-10">-</button>
        <button @click="pressed('7')" class="p-2 border rounded shadov w-10 h-10">7</button>
        <button @click="pressed('8')" class="p-2 border rounded shadov w-10 h-10">8</button>
        <button @click="pressed('9')" class="p-2 border rounded shadov w-10 h-10">9</button>
        <button @click="pressed('*')" class="p-2 border rounded shadov w-10 h-10">*</button>
        <button @click="pressed('C')" class="p-2 border rounded shadov w-10 h-10">C</button>
        <button @click="pressed('0')" class="p-2 border rounded shadov h-10 w-10">0</button>
        <button @click="pressed('=')" class="p-2 border rounded shadov w-10 h-10">=</button>
        <button @click="pressed('/')" class="p-2 border rounded shadov w-10 h-10">/</button>
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



    return {pressed,currentNum,prevNum,selectedOperation, numbers}
  }
}
</script>

<style lang="scss" scoped>

</style>