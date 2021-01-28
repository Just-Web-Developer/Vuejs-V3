<template>
  <AppHeader
      :isLoggedIn="isLoggedIn"/>
  <div class="flex w-screen overflow-x-hidden flex-col">
    <router-view></router-view>
  </div>
  <teleport to="body">
    <Login />
  </teleport>


</template>

<script>
import AppHeader from "@/components/AppHeader/AppHeader";
import Login from "@/pages/Login";
import firebase from "@/utilities/firebase";

export default {
  name: 'App',
  components: {
    AppHeader,
    Login
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user){
        this.$store.commit('setIsLoggedIn',true)
        this.$store.commit('setAuthUser',user)

      }
      else{
        this.$store.commit('setIsLoggedIn',false)
        this.$store.commit('setAuthUser',{})
      }
    })
  }

}
</script>

<style>



</style>


