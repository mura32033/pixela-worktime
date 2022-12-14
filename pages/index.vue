<template>
  <div>
    <div class="rounded-xl py-4 px-8 lg:py-8 lg:px-12 lg:shadow-lg lg:shadow-slate-600 max-h-96" v-if="!loading">
      <div class="grid grid-cols-2 grid-rows-2 gap-4 mb-4">
        <h1 class="row-span-2 text-6xl text-slate-100" style="text-shadow: 2px -2px 5px #334155;">{{ formatDuration(stats.todaysQuantity) }}</h1>
        <div class="row-start-2 col-start-2 ml-auto text-right text-slate-400 text-sm">
          <p>Total work: {{ stats.totalPixelsCount }} days</p>
          <p>Daily average work: {{ formatDuration(stats.avgQuantity) }}</p>
        </div>
      </div>
      <h2 class="text-3xl">History</h2>
      <div class="my-4 max-h-40 overflow-y-scroll scroll-smooth scrollbar">
        <div v-for="h in history" :key="h.date" class="mx-4 text-slate-400">
          <div class="flex flex-row items-end gap-2 border-b border-b-slate-700">
            <h3 class="text-xl">{{ formatDate(h.date) }}</h3>
            <p class="text-sm ml-auto">Total: {{ formatDuration(h.quantity) }}</p>
          </div>
          <ul>
            <li v-for="(p, index) in JSON.parse(h.optionalData).stopwatchUsage.stopwatchPeriods" :key="h.date + index" class="text-sm ml-8 my-2 list-disc">
              {{ p }} ({{ calcMinutes(p) }} minutes)
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="rounded-xl py-4 px-8 lg:py-8 lg:px-12 lg:shadow-lg lg:shadow-slate-600 max-h-96" v-else>
      <h1 class="text-6xl text-slate-100" style="text-shadow: 2px -2px 5px #334155;">Loading...</h1>
    </div>
  </div>
</template>

<script lang="ts">
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(duration)
dayjs.extend(customParseFormat)

export default {
  data () {
    return {
      history: '',
      stats: '',
      loading: true
    }
  },
  methods: {
    async getWorktime () {
      this.loading = true
      const history:Object = await $fetch('api/history')
      const stats:Object = await $fetch('api/stats')
      this.history = history.pixels.reverse()
      this.stats = stats
      this.loading = false
    },
    formatDate (date: number) {
      const d = dayjs(date)
      return d.format('YYYY/MM/DD')
    },
    formatDuration (duration: number) {
      const d = dayjs.duration(duration, 'minutes')
      return d.format('HH:mm:ss')
    },
    calcMinutes (duration: string) {
      const timePeriod = duration.split(' - ')
      const start = dayjs(timePeriod[0], "HH:mm:ss")
      if (!timePeriod[1]) {
        return 0
      } else {
        const end = dayjs(timePeriod[1], "HH:mm:ss")
        const diff = end.diff(start, 'minutes')
        return diff
      }      
    }
  },
  mounted () {
    this.getWorktime()
  }
}
</script>

<style>
.scrollbar::-webkit-scrollbar {
  width: 5px;
}

.scrollbar::-webkit-scrollbar-track {
  @apply bg-slate-700;
  border-radius: 15px;
}

.scrollbar::-webkit-scrollbar-thumb {
  @apply bg-slate-400;
  border-radius: 15px;
}
</style>