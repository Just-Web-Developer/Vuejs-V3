<template>
  <div class="m-auto">
    <PageName>
      Heroes {{heroesCounter}}
    </PageName>
    <ul >
      <li
          v-for="(hero,index) in heroes"
          :key="hero.name"
          class="flex justify-between">
        <p class=" my-4 text-2xl">{{hero.name}} </p>
        <button @click="deleteHero(index)">x</button>
      </li>
    </ul>
    <form
        @submit.prevent="addHero"
        class="mt-4">
      <input
          v-model.trim.lazy="newHero"
          placeholder="Enter Hero"
          class="border rounded-3xl text-center border-8 border-black mr-1.5"
          ref="newHeroRef">
      <button type="submit" class="border bg-gradient-to-r from-blue-500 to-green-400 text-white rounded-3xl text-center py-1 px-2">Add Hero</button>
    </form>
  </div>

</template>

<script>
import {ref, onMounted, computed} from 'vue'
import PageName from "@/components/PageName/PageName";

export default {
  components:{PageName},
  setup(){
    const newHeroRef = ref("")
    const heroes = ref ([
      {name:'SuperMan'},
      {name:'SuperGirl'},
      {name:'Flash'},
      {name:'Batman'},
      {name:'Green Arrow'},
    ])
    const newHero= ref('')

    function deleteHero(index){
      heroes.value = heroes.value.filter((hero,i) => i != index)
    }
    function addHero(){
      if (newHero.value !== ''){
        heroes.value.unshift({name:newHero.value})
        newHero.value=''
      }
      else{
        alert('Firstly, enter a hero`s name')
      }
    }

    onMounted(() => {
      newHeroRef.value.focus()
    })

    const heroesCounter = computed({
      get:() => heroes.value.length
    })

    return {heroes,newHero, deleteHero, addHero,onMounted, newHeroRef,heroesCounter}
  },
  name: "Heroes",
}
</script>

<style>

</style>