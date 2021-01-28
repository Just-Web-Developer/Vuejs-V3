<template>
  <div class="m-auto px-4">
    <PageName>
      Calendar
    </PageName>
    <section class="mx-2 flex justify-between mb-3">
      <h2 class="font-bold">{{currentMonthName}}</h2>
      <h2 class="font-bold">{{currentYear}}</h2>
    </section>
    <section class="flex mb-2">

      <p class=" text-center" style="width: 14.28%" v-for="day in days" :key="day">{{day}}</p>
    </section>
    <section class="flex flex-wrap">
      <p class=" text-center" style="width: 14.28%" v-for="i in startDay()" :key="i"></p>
      <p class=" text-center" style="width: 14.28%"
         v-for="num in daysInMonth()" :key="num"
         :class="currentDateClass(num)">{{num}}</p>
    </section>
    <section class="flex justify-between my-4">
      <button class="px-2 border rounded" @click="prev">Prev</button>
      <button class="px-2 border rounded" @click="next">Next</button>
    </section>
  </div>

</template>

<script>
import PageName from "@/components/PageName/PageName";

export default {
  name: "Calendar",
  components:{PageName},
  data(){
    return{
      currentDate: new Date().getUTCDate(),
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
      days:['Sun','Mon','Tue','Wed','Thu','Fri','Sat',]
    }
  },
  methods:{
    daysInMonth(){
      return new Date(this.currentYear,this.currentMonth+1,0).getDate()
    },
    startDay(){
      return new Date(this.currentYear,this.currentMonth, 1).getDay()
    },
    next(){
      if (this.currentMonth == 11){
        this.currentYear++
        this.currentMonth=0
      }else{
        this.currentMonth++
      }

    },
    prev(){
      if (this.currentMonth == 0){
        this.currentYear--
        this.currentMonth=11
      }else{
        this.currentMonth--
      }
    },
    currentDateClass(num){
      const calendarFullDate = new Date(this.currentYear, this.currentMonth, num).toDateString()
      const currentFullDate = new Date().toDateString()
      if(calendarFullDate === currentFullDate ){
        return 'text-blue-800 border bg-gray-100 rounded'
      }else{
        return ''
      }
    }
  },
  computed:{
    currentMonthName(){
      return new Date(this.currentYear,this.currentMonth).toLocaleString('default',{month:'long'}).toUpperCase()
    }
  }
}

</script>

<style lang="scss" scoped>

</style>