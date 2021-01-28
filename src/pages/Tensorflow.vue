<template>
  <section class="flex w-full">
    <div class="m-auto">
      <div class="mt-10">
        <PageName>
          Tensorflow Object Detection
        </PageName>
        <div class="flex items-center flex-col">
          <div class="flex items-center flex-col my-2">
            <button v-if="!isStreaming" class="border bg-gray-200 my-5 px-2 py-1 rounded" @click="openCamera">Open Camera</button>
            <button v-else class="border bg-gray-200 my-5 px-2 py-1 rounded" @click="closeCamera">Stop Streaming</button>
            <video ref="videoRef" autoplay="true" width="100"></video>
            <button v-if="isStreaming" class="border bg-gray-200 my-5 px-2 py-1 rounded" @click="takeSnapshot">Take a Snapshot</button>
          </div>
          <img
              ref="imgRef"
              src="https://images.unsplash.com/photo-1567581935884-3349723552ca"
              width="200"
              crossorigin="anonymous"/>
          <button @click="detect" class="border bg-gray-200 my-5 px-2 py-1 rounded">
            <span v-if="!isLoading">Detect Object</span>
            <span v-else>Loading...</span>
          </button>
          <div v-if="result.length > 0" class="w-full flex justify-center">
            <p>{{result[0].class}}</p>
          </div>

        </div>

      </div>
    </div>
  </section>
</template>

<script>
import { ref} from "vue";
import PageName from "@/components/PageName/PageName";

require('@tensorflow/tfjs-backend-cpu');
require('@tensorflow/tfjs-backend-webgl');
const cocoSsd = require('@tensorflow-models/coco-ssd');

export default {
  name: "Tenserflow",
  components:{PageName},
  setup(){
    const imgRef = ref('')
    const videoRef = ref('')
    const result = ref([])
    const isLoading = ref(false)
    const isStreaming = ref(false)

    async function detect(){
      const img = imgRef.value
      isLoading.value = true
      const model = await cocoSsd.load();
      const predictions = await model.detect(img);
      result.value = predictions
      isLoading.value = false
    }

    async function openCamera(){
      if(navigator.mediaDevices.getUserMedia){
        const devices = await navigator.mediaDevices.enumerateDevices()
        const cams = devices.filter((device) => device.kind === 'videoinput')
        const camId = cams[0].deviceId
        navigator.mediaDevices.getUserMedia({video: {deviceId: {exact:camId}}}).then(stream => {
          isStreaming.value = true
          videoRef.value.srcObject = stream
        })
      }
      else{
        console.log('No camera')
      }
    }

    function closeCamera(){
      const stream = videoRef.value.srcObject
      const tracks = stream.getTracks()
      tracks.map(track => track.stop())
      isStreaming.value = false
    }

    function takeSnapshot(){
      const canvas = document.createElement('canvas')
      const context = canvas.getContext("2d")
      context.drawImage(videoRef.value,0,0,200,200)
      const data = canvas.toDataURL('image/png')
      imgRef.value.setAttribute('src',data)
    }

    return {imgRef,result,detect,isLoading,openCamera,videoRef,isStreaming,closeCamera,takeSnapshot}
  }
}
</script>

<style lang="scss" scoped>

</style>