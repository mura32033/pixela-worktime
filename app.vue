<template>
  <div class="dark flex flex-col items-center justify-center min-h-screen dark:bg-slate-900 dark:text-slate-300">
    <div class="border rounded-xl py-8 px-12 shadow-xl shadow-slate-500 divide-y divide-slate-700 space-y-4">
      <div class="grid grid-cols-2 grid-rows-2 gap-4">
        <h1 class="row-span-2 text-6xl text-slate-100 italic">{{ formatDuration(stats.todaysQuantity) }}</h1>
        <div class="row-start-2 col-start-2 ml-auto text-right text-slate-400 text-sm">
          <p>Total work: {{ stats.totalPixelsCount }} days</p>
          <p>Daily average work: {{ formatDuration(stats.todaysQuantity) }}</p>
        </div>
      </div>
      <div>
        <h2 class="text-3xl my-4">History</h2>
        <div v-for="h in history.pixels" :key="h.date" class="ml-4">
          <div class="flex flex-row items-end gap-2 border-b border-b-slate-700">
            <h3 class="text-xl">{{ formatDate(h.date) }}</h3>
            <p class="text-sm">Total: {{ formatDuration(h.quantity) }}</p>
          </div>
          <div v-for="(p, index) in JSON.parse(h.optionalData).stopwatchUsage.stopwatchPeriods" :key="h.date + index" class="text-sm ml-4 my-2">
            <p>{{ (index +  1) + ': ' + p }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
dayjs.extend(duration)

export default {
  data () {
    return {
      history: '',
      stats: ''
    }
  },
  methods: {
    async getWorktime () {
      const history = await $fetch('api/history')
      const stats = await $fetch('api/stats')
      this.history = history
      this.stats = stats
    },
    formatDate (date) {
      const d = dayjs(date)
      return d.format('YYYY/MM/DD')
    },
    formatDuration (duration) {
      const d = dayjs.duration(duration, 'minutes')
      return d.format('HH:mm:ss')
    }
  },
  mounted () {
    this.getWorktime()
  }
}
</script>
