<template>
  <section class="mx-auto my-10 border rounded-lg p-2">
    <div v-for="chat in state.chats"
         :key="chat.message"
         class="my-3"
         :class="chat.userId === userId ? 'text-right' : ''">
      <span class=" border rounded p-1 ">
        {{chat.message}}
      </span>

    </div>
    <input v-model="state.message" class="border border-black" @keydown.enter="addMessage">
  </section>
</template>

<script>
import {computed, onMounted, reactive} from 'vue'
import {chatsRef} from '@/utilities/firebase'
import {useStore} from 'vuex'

export default {
name: "Chats",
  setup(){
    const state = reactive({
      chats:[],
      message:'',
      collection: null
    })

    const store = useStore()
    const userId = computed(() => store.state.authUser.uid)

    onMounted(async ()=>{
      chatsRef.on("child_added",(snapshot)=>{
        state.chats.push({key:snapshot.key,...snapshot.val()})
      })
    })
  function addMessage(){
    let newChat = chatsRef.push()

    newChat.set({userId:userId.value, message: state.message})
    state.message = "";
  }
    return {state, addMessage,userId,store}
  }
}
</script>

<style lang="scss" scoped>

</style>