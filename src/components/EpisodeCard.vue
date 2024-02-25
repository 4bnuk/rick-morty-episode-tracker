<script setup>
const emit = defineEmits(['episodeStatusChanged'])

const props = defineProps({
  episode: { type: Object, required: true },
  episodesStatus: { type: Object, required: true }
})

function checkStatus(id, status) {
  return props.episodesStatus[status].includes(id)
}

function emitStatusChange(status) {
  emit('episodeStatusChanged', props.episode.id, status)
}
</script>

<template>
  <div class="flex flex-col p-5 shadow rounded-lg border-2 dark:bg-gray-800 bg-white dark:border-gray-700 min-h-40">
    <div class="flex space-x-4">
      <svg @click="emitStatusChange('watched')" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
        stroke-width="1.5" class="w-6 h-6 cursor-pointer"
        :class="[checkStatus(episode.id, 'watched') ? 'dark:stroke-yellow-custom stroke-green-custom' : 'dark:stroke-white stroke-black']">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
      <svg @click="emitStatusChange('watching')" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
        stroke-width="1.5" class="w-6 h-6 cursor-pointer"
        :class="[checkStatus(episode.id, 'watching') ? 'dark:stroke-yellow-custom stroke-green-custom' : 'dark:stroke-white stroke-black']">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
      <svg @click="emitStatusChange('favorite')" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
        stroke-width="1.5" class="w-6 h-6 cursor-pointer"
        :class="[checkStatus(episode.id, 'favorite') ? 'dark:fill-yellow-custom dark:stroke-yellow-custom stroke-green-custom fill-green-custom' : 'dark:stroke-white stroke-black']">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
    </div>
    <p class="text-2xl font-creepster text-green-custom dark:text-yellow-custom mt-4 grow">{{ episode.name }}</p>
    <p class="text-sm text-black dark:text-white mt-2">{{ episode.episode }}</p>
    <p class="text-black dark:text-white">Air Date: {{ episode.air_date }}</p>
  </div>
</template>