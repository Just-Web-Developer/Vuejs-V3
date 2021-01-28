<template>
  <section
      class=" z-20 h-screen w-screen bg-gray-500 fixed top-0 left-0 opacity-50"
      @click="close">
  </section>
  <div class="absolute inset-0">
    <div class="flex h-full">
      <div class="z-30 m-auto bg-white p-2 rounded shadow-2xl modal lg:w-1/2">
        <div class="p-2 border">
          <h1>
            <slot name="title"></slot>
          </h1>
          <main class="mt-4">
            <slot name="main"></slot>
          </main>

        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
name: "Modal",
  setup(props, {emit}){
    function close(){
      emit("close-modal")

    }

    return {close}
  }
}
</script>

<style lang="scss" scoped>

</style>