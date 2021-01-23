<template>
  <button class="px-2 py-1 border my-4" @click="isModalOpen = true">Add user</button>
  <teleport to="body">
    <Modal v-if="isModalOpen" @close-modal="isModalOpen=false">
      <template #title>
        Add New User
      </template>
      <template #body>
        <form @submit.prevent="submit">
          <div class="px-2 my-3">
            <label for="name">Name:</label>
            <input id="name" placeholder="User Name" class="border w-full p-1" v-model="state.form.name">
          </div>
          <div class="px-2 my-3">
            <label for="email">Email:</label>
            <input id="email" placeholder="User Email" type="email" class="border w-full p-1" v-model="state.form.email">
          </div>
          <div class="px-2 my-3">
            <label for="avatar">Avatar:</label>
            <input id="avatar" placeholder="Avatar URL" class="border w-full p-1" v-model="state.form.avatar">
          </div>
          <div class="px-2 my-3">
            <input value="Create" type="submit" class="border w-full p-1">
          </div>
        </form>
      </template>
    </Modal>
  </teleport>
</template>

<script>
import Modal from "@/components/ReusableModal/Modal";
import {reactive, ref} from "vue";
import axios from "@/plugins/axios";

export default {
name: "Create",
  components:{Modal},
  setup(_,{emit}){
    const isModalOpen = ref(false)

    const state = reactive({
      form:{
        name:"",
        email:"",
        avatar:""
      }
    })

    async function submit(){
      const {data} = await axios.post('/users',state.form)
      emit('new-user-added',data)
      isModalOpen.value = false
      state.form.name = ''
      state.form.email = ''
      state.form.avatar = ''
    }

    return{isModalOpen,submit,state}
  }
}
</script>

<style lang="scss" scoped>

</style>