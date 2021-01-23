<template>
  <section class="flex flex-col w-full">
    <div class="m-auto">
      <h1 class="text-2xl my-5">Re-usable Modal</h1>
      <Modal v-if="isRedModalOpen" @close-modal="isRedModalOpen = false">
        <template v-slot:title>
          Red modal
        </template>
        <template v-slot:main>
          <p>Something important...</p>
        </template>
        <template v-slot:conclusion>
          <section><span>Last words)</span></section>
        </template>
      </Modal>
      <button @click="isRedModalOpen=true">Open Red Modal</button>
      <Modal v-if="isBlueModalOpen" @close-modal="isBlueModalOpen = false">
        <template v-slot:title>
          Blue modal
        </template>
        <template v-slot:main>
          <p>Something important...</p>
        </template>

      </Modal>
      <button @click="isBlueModalOpen=true">Open Blue Modal</button>
    </div>

  </section>
</template>

<script>
import Modal from '@/components/ReusableModal/Modal'
import {ref} from 'vue'

export default {
name: "ReusableModal",
  components: {Modal},
  setup(){
    const isRedModalOpen = ref(false)
    const isBlueModalOpen = ref(false)

    return {isRedModalOpen,isBlueModalOpen}
  }
}
</script>

<style lang="scss" scoped>

</style>