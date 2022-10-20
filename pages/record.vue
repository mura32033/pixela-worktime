<template>
  <div class="flex flex-col rounded-xl py-4 px-8 lg:py-8 lg:px-12 max-h-96">
    <h1 class="text-6xl text-slate-100" style="text-shadow: 2px -2px 5px #334155;"><nuxt-link to="/">Record</nuxt-link><span @click="checkChar()">.</span></h1>
    <p class="text-small" :class="isClicked ? 'text-slate-300' : 'text-red-400'">{{ message }}</p>
    <button class="rounded px-4 py-2 bg-slate-800 shadow mt-4 hover:bg-slate-700 mx-auto disabled:cursor-not-allowed disabled:hover:bg-slate-800" :disabled="!isClicked">Work</button>
  </div>
</template>

<script lang="ts">
export default {
  data () {
    return {
      isClicked: false,
      message: ''
    }
  },
  methods: {
    async getWorktime () {
      if (this.isClicked) {
        const response:Object = await $fetch('api/record')
        this.message = response.message
      } else {
        this.message = "Can't start/stop record."
      }
    },
    checkChar () {
      this.isClicked = true
      this.message = "Hit 'Work' now!"
    }
  }
}
</script>