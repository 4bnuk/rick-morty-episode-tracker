<script setup>
import { ref, onMounted } from 'vue'
import EpisodeCard from '@/components/EpisodeCard.vue'
import Spinner from '@/components/Spinner.vue'
import Pagination from '@/components/Pagination.vue'
import { useEpisodesStore } from '@/stores/episodes'

const store = useEpisodesStore()
const isLoading = ref(false)

async function fetchEpisodes(page) {
  isLoading.value = true
  await store.fetch(page)

  if (window.scrollY > 0) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  isLoading.value = false
}

function handlePageChange(page) {
  store.currentPage = page
  fetchEpisodes(page)
}

function handleEpisodeStatus(id, status) {
  const index = store.episodesStatus[status].indexOf(id)

  if (index !== -1) store.episodesStatus[status].splice(index, 1)
  else store.episodesStatus[status].push(id)
}

onMounted(async () => {
  await fetchEpisodes(store.currentPage)
})
</script>

<template>
  <div v-if="!isLoading" class="container mx-auto px-4 py-16 grow">
    <h2 class="uppercase tracking-wider dark:text-yellow-custom text-green-custom text-3xl font-creepster text-center">
      Episode List
    </h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mt-8">
      <EpisodeCard v-for="episode in store.episodes" :key="episode.id" :episode="episode"
        :episodes-status="store.episodesStatus" @episode-status-changed="handleEpisodeStatus" />
    </div>
    <Pagination v-if="store.totalPages > 1" :total-pages="store.totalPages" :current-page="store.currentPage"
      @page-changed="handlePageChange" class="text-center mt-8" />
  </div>
  <div v-else>
    <Spinner />
  </div>
</template>
