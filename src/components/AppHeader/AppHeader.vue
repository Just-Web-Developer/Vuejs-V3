<template>
  <header>
    <div v-show="navShow" class="fixed z-30 w-screen h-screen bg-gray-200 opacity-40"></div>

      <transition name="navbar" >
        <nav v-if="navShow"
             class="bg-gradient-to-r from-blue-800 to-blue-600 fixed right-0 h-screen  px-4 py-14 flex flex-col items-center z-40 justify-start">
          <ul>
            <li v-for="item in list"
                :key="item"
                class="text-white text-2xl mx-3 my-2 text-center"
                @click="navShow = false">
                <router-link
                    :to="item.to">
                  {{ item.title }}
                </router-link>
            </li>
          </ul>

          <button v-if="!isLoggedIn" class="text-white text-2xl mx-3" @click="openLogin()">Login</button>
          <button v-else class="text-white text-2xl mx-3" @click="logout">Logout</button>
        </nav>
      </transition>
    <div  class="fixed right-4 top-5 z-50 nav-but" @click="navShow = !navShow" :class="navShow ? 'active' : ''">
      <div class="line1"></div>
      <div class="line2"></div>
      <div class="line3"></div>
    </div>
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
      navShow:false,
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

<style lang="scss">
  $width:2rem;

  router-link{
    cursor: pointer;
  }
  .navbar-enter-active,
  .navbar-leave-active {
    transition: all 0.3s ease;
  }
  .navbar-enter-from{
    transform: translateX(100%);
  }
  .navbar-leave-to{
    transform: translateX(100%);
  }

  .nav-but{
    div{
      width: $width;
      height: calc(#{$width} / 10);
      margin: calc(#{$width} / 6);
      background: #000;
      transition: all 0.3s ease-in;

    }
    &.active .line1{
      transform: rotate(45deg) translate(calc(#{$width} / 6), calc(#{$width} / 5));
      background: #fff;
    }


    &.active .line2{
      opacity: 0;
      background: #fff;
    }


    &.active .line3{
      transform: rotate(-45deg) translate(calc(#{$width} / 6), calc(#{$width} / -5));
      background: #fff;
    }

  }

</style>