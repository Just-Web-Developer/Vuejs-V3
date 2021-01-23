<template>
  <div class=" relative flex flex-wrap w-full" :style="'height:' + sliderHeight + 'px'">
    <div
        class=" w-full absolute"
        v-for="(color,index) in sliders"
        :key="color">
      <transition name="slider">
        <div
            v-if="currentSlide == index"
            :class="color"
            :style="'height:'+ sliderHeight + 'px'"
        ></div>
      </transition>
    </div>
    <div
        class="absolute w-full"
        :style="'height:' + labelsPositionBottom + 'px'">
      <div class="absolute flex w-full bottom-0 justify-center">
        <div
            v-for="(i,index) in sliders"
            :key="i"
            class="w-4 h-4 rounded-full z-10 mx-2 cursor-pointer shadow-md"
            :class="currentSlide == index? 'bg-gray-600':'bg-gray-200'"
            @click="currentSlide=index">
      </div>


      </div>
    </div>
  </div>
</template>

<script>
export default {
name: "Slider Carousel",
  data(){
    return{
      currentSlide:0,
      slider:'',
      sliders:['bg-blue-600','bg-yellow-600','bg-green-600'],
      isTitleShowing:true,
      sliderHeight:350,
      labelsBottom:10
    }
  },
  computed:{
   labelsPositionBottom(){
     return this.sliderHeight - this.labelsBottom
   }
  },
  mounted() {
    this.slider = setInterval(()=>{
      if (this.currentSlide == 2){
        this.currentSlide = 0
      }else{
        this.currentSlide++
      }
    },2000)
  },
  beforeUnmount() {
    clearInterval(this.slider)
    this.currentSlide=0
  }
}
</script>

<style >
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .5s ease;
  }
  .fade-enter-from,
  .fade-leave-to{
    opacity: 0;
  }
  .slider-enter-active,
  .slider-leave-active {
    transition: all 1s ease;
  }
  .slider-enter-from,
  .slider-leave-to{
    opacity: 0;
  }
  .slider-enter-from{
    transform: translateX(-40px);
  }
  .slider-leave-to{
    transform: translateX(40px);
  }
</style>