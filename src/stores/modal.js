import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', () => {
  const show = ref(false)
  const title = ref('')
  const message = ref('')

  function $reset() {
    show.value = false
    title.value = ''
    message.value = ''
  }

  function open(payload) {
    title.value = payload.title
    message.value = payload.message
    show.value = true
  }

  function close() {
    $reset()
  }

  return { show, title, message, open, close }
})
