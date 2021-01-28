<template>
  <div v-if="isLoginOpen">
    <section
        class=" z-50 h-screen w-screen bg-gray-500 fixed top-0 opacity-50"
        @click="close">
    </section>
    <div class="absolute inset-0">
      <div class="flex h-full">
        <div class="z-50 m-auto bg-white p-2 rounded shadow-2xl modal lg:w-1/2">
          <div class="p-2 border">
            <h1 class="text-3xl text-center">Login</h1>
            <GoogleLogin @close-login-from-google="close()"/>
            <p class="my-3 text-center">Or</p>
            <form class="p-2 m-2"
                  @submit.prevent="submit">
              <div class="my-4">
                <label for="Email" >Email or Username</label>
                <input
                    id="Email"
                    class="rounded shadow p-2 w-full"
                    placeholder="Enter your Email or Username"
                    v-model="email"
                    ref="emailRef">
              </div>
              <div class="my-4">
                <label for="Password" >Password</label>
                <input
                    id="Password"
                    class="rounded shadow p-2 w-full"
                    type="password"
                    placeholder="Enter your password"
                    v-model="password">
              </div>
              <div class="my-4">
                <button
                    type="submit"
                    class="w-full rounded shadow-md bg-gradient-to-r from-red-800 to-pink-600 text-white p-2"
                >
                  <span v-if="!isLoading">Login</span>
                  <span v-else>Loading...</span>
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  </div>


</template>

<script>
import firebase from '../utilities/firebase'
import GoogleLogin from "@/components/Login/GoogleLogin";

export default {
name: "Login",
  components:{GoogleLogin},
  methods:{
    submit(){
      this.isLoading=true
      firebase
          .auth()
          .signInWithEmailAndPassword(this.email,this.password)
          .then(res => {
            console.log(res)
            this.email=""
            this.password=""
            this.isLoading=false
            this.close()
          }).catch(e => {
            console.log(e)
            this.isLoading=false
          })
    },
    close(){
      this.$store.commit('setLoginModal',false)
    },

  },
  computed:{
    isLoginOpen(){
      return this.$store.state.isLoginOpen
    }
  },
  data(){
    return{
      email:'',
      password:'',
      isLoading:false
    }
  },
  mounted() {
    // this.$refs.emailRef.focus()
  }
}
</script>

<style lang="scss" scoped>

</style>