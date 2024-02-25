import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { fetchEpisodes } from '@/api'
import { useModalStore } from '@/stores/modal'

export const useEpisodesStore = defineStore('episodes', () => {
  const episodes = ref([])
  const totalPages = ref(0)
  const currentPage = ref(1)
  const episodesStatus = ref({
    watched: [],
    watching: [],
    favorite: []
  })

  if (localStorage.getItem('episodesStatus')) episodesStatus.value = JSON.parse(localStorage.getItem('episodesStatus'))

  async function fetch(page) {
    try {
      let response = await fetchEpisodes(page)
      response = await response.json()
      if (response.error) throw new Error(response.error)
      episodes.value = response.results
      totalPages.value = response.info.pages
    } catch (error) {
      const modalStore = useModalStore()
      modalStore.open({ title: 'Error!!!', message: error.message })
    }
  }

  // Persist episode status so we don't lose them when we refresh or change the page.
  watch(
    episodesStatus,
    (state) => {
      localStorage.setItem('episodesStatus', JSON.stringify(state))
    },
    { deep: true }
  )

  return { episodes, totalPages, currentPage, episodesStatus, fetch }
})
