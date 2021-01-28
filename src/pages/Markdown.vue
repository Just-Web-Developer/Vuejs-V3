<template>
  <div class="flex flex-col w-full">
    <PageName>
      Vue Markdown
    </PageName>
    <section class="flex w-10/12 m-auto h-screen">
      <article class="w-1/2 border">
        <textarea :value="text" @input="update" class="w-full h-full" ref="newMarkdownRef"></textarea>
      </article>
      <article class="w-1/2 border bg-gray-100" v-html="markedText"></article>
    </section>
  </div>
</template>

<script>
import marked from 'marked'
import useDebounce from "@/utilities/composition/useDebounce";
import PageName from "@/components/PageName/PageName";

export default {
name: "Markdown",
  components:{PageName},
  data(){
    return{
      text:'',
      debounce:''
    }
  },
  methods:{
    update(e){
      const task = () => (this.text = e.target.value)
      this.debounce(task,500)
    },

  },
  computed:{
    markedText(){
      return marked(this.text)
    }
  },
  mounted() {
    this.debounce = useDebounce()
    this.$refs.newMarkdownRef.focus()
  }
}
</script>

<style lang="scss" scoped>

</style>