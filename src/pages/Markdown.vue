<template>
  <div class="flex flex-col w-full">
    <PageName>
      Vue Markdown
    </PageName>
    <section class="flex w-10/12 m-auto pb-1.5 flex-col lg:flex-row">
      <article class="w-full border mb-10 lg:w-1/2 lg:mb-0">
        <textarea :value="text" @input="update" class="w-full h-52 lg:h-full" ref="newMarkdownRef"></textarea>
      </article>
      <article class="w-full border bg-gray-100 min-h-52 h-auto break-words lg:w-1/2" v-html="markedText"></article>
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
  .min-h-52{
    min-height: 13rem;
  }
</style>