<template>
  <section class="mt-5 text-center">
    <button class=" border px-3 rounded" @click="loginWithGoogle">Login with Google</button>
  </section>
</template>

<script>
import firebase from "@/utilities/firebase";

export default {
  name: "GoogleLogin",
  methods:{
    loginWithGoogle(){
      var provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider).then(() => {
        this.$emit("close-login-from-google")
      })
    }
  }
}

</script>

<style lang="scss" scoped>

</style>