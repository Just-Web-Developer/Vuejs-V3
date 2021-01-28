<template>
  <section class="flex w-full">
    <div class="m-auto">
      <PageName>User Crud</PageName>
      <Create @new-user-added="addUser"/>
      <table >
        <thead>
          <tr>
            <th >Id</th>
            <th >Avatar</th>
            <th >Name</th>
            <th >Email</th>
            <th >Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in state.users" :key="user._id">
            <td>{{user._id}}</td>
            <td><img :src="user.avatar" alt=""></td>
            <td>{{user.name}}</td>
            <td>{{user.email}}</td>
            <td><button class="border px-2 py-1" @click="deleteUser(user._id) ">Delete</button></td>
          </tr>
        </tbody>
      </table>
      <div class="flex justify-between">
        <button :disabled="state.users.page === 1" class="border rounded" @click="prev()">Prev</button>
        <button :disabled="state.users.total_pages === state.users.page" class="border rounded" @click="next()" >Next</button>
      </div>


    </div>
  </section>

</template>

<script>
import {onMounted,reactive} from 'vue'
import axios from '../plugins/axios'
import Create from "@/components/UserCrud/Create";
import PageName from "@/components/PageName/PageName";

export default {
name: "userCrud",
  components:{Create, PageName},
  setup(){
  const state = reactive({
    users:[],
    page:1,

  })


    onMounted( async ()=>{
      const {data} = await axios.get(`/users`)
      state.users = data
    })

    async function deleteUser(id){
      const {data} = await axios.delete(`/users/${id}`)
      state.users = state.users.filter(user => user._id != id)
      console.log(data)
    }
    function addUser(data){
      state.users.push(data)
    }
    async function next(){
      state.page++
      const {data} = await axios.get(`/users?page=${state.page}`)
      state.users = data
    }

    async function prev(){
      state.page--
      const {data} = await axios.get(`/users?page=${state.page}`)
      state.users = data
    }

    return {state,next,prev,deleteUser,addUser}
  }
}
</script>

<style lang="scss" scoped>
</style>