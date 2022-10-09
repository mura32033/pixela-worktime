<template>
  <div class="dark flex flex-col items-center justify-center min-h-screen dark:bg-slate-900 dark:text-slate-300 font-digital">
    <div class="rounded-xl py-4 px-8 lg:py-8 lg:px-12 lg:shadow-lg lg:shadow-slate-600">
      <div class="divide-y divide-slate-700 space-y-" v-if="!loading">
        <div class="grid grid-cols-2 grid-rows-2 gap-4">
          <h1 class="row-span-2 text-6xl text-slate-100" style="text-shadow: 2px -2px 5px #334155;">{{ formatDuration(stats.todaysQuantity) }}</h1>
          <div class="row-start-2 col-start-2 ml-auto text-right text-slate-400 text-sm">
            <p>Total work: {{ stats.totalPixelsCount }} days</p>
            <p>Daily average work: {{ formatDuration(stats.avgQuantity) }}</p>
          </div>
        </div>
        <div>
          <h2 class="text-3xl my-4">History</h2>
          <div v-for="h in history.pixels" :key="h.date" class="ml-4 text-slate-400">
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
      <div v-else>
        <h1 class="text-6xl text-slate-100" style="text-shadow: 2px -2px 5px #334155;">Loading...</h1>
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
      stats: '',
      loading: true
    }
  },
  methods: {
    async getWorktime () {
      this.loading = true
      const history = await $fetch('api/history')
      const stats = await $fetch('api/stats')
      this.history = history
      this.stats = stats
      this.loading = false
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
