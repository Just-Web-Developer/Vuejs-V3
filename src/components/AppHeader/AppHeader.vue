<template>
  <header>
    <nav class="w-full bg-gradient-to-r from-blue-800 to-blue-600 px-4 py-2 flex">
      <router-link
          v-for="item in list"
          :to="item.to"
          :key="item"
          class="text-white text-3xl mx-3">
        {{ item.title }}
      </router-link>
      <button v-if="!isLoggedIn" class="text-white text-3xl mx-3" @click="openLogin()">Login</button>
      <button v-else class="text-white text-3xl mx-3" @click="logout">Logout</button>
    </nav>
  </header>
</template>

<script>
import firebase from '../../utilities/firebase'

export default {
  name: "AppHeader",
  data(){
    return {
      list:[
        {title:'Home', to: '/'},
        {title:'Heroes', to: '/heroes'},
        {title:'Calendar', to: '/calendar'},
        {title:'Markdown', to: '/markdown'},
        {title:'Slider', to: '/slider'},
        {title:'Calculator', to: '/calculator'},
        {title:'Reusable Modal', to: '/reusablemodal'},
        {title:'Chat', to: '/chat'},
        {title:'User Crud', to: '/usercrud'},
        {title:'Tensorflow', to: '/tensorflow'},
      ],
      store: this.$store.state
    }
  },
  computed:{
    isLoggedIn(){
      return this.$store.state.isLoggedIn
    }
  },
  methods:{
    logout(){
      firebase.auth().signOut()
    },
    openLogin(){
      this.$store.commit('setLoginModal',true)
    }
  }
}
</script>

<style>
  router-link{
    cursor: pointer;
  }

</style>