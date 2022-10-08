<template>
  <div>
    <h1>My Worktime</h1>
    <div>
      <p>Work day: {{ stats.totalPixelsCount }}</p>
      <p>Average: {{ stats.avgQuantity }}</p>
      <p>Today's Work: {{ stats.todaysQuantity }}</p>
    </div>
    <h2>History</h2>
    <div v-for="h in history.pixels" :key="h.date">
      <p>{{ formatDate(h.date) }}</p>
      <p>合計作業時間: {{ formatDuration(h.quantity) }}</p>
      <div v-for="(p, index) in JSON.parse(h.optionalData).stopwatchUsage.stopwatchPeriods" :key="h.date + index">
        <p>{{ (index +  1) + ': ' + p }}</p>
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
      return d.format('YYYY年MM月DD日')
    },
    formatDuration (duration) {
      const d = dayjs.duration(duration, 'minutes')
      return d.format('H時間m分')
    }
  },
  mounted () {
    this.getWorktime()
  }
}
</script>
