<script setup>
import { computed } from 'vue'

const emit = defineEmits(['pageChanged'])

const props = defineProps({
  maxVisibleButtons: {
    type: Number,
    required: false,
    default: 3
  },
  totalPages: { type: Number, required: true },
  currentPage: { type: Number, required: true }
})

const startPage = computed(() => {
  if (props.currentPage === props.totalPages) {
    return Math.max(props.totalPages - props.maxVisibleButtons + 1, 1)
  }

  return Math.max(props.currentPage - 1, 1)
})

const endPage = computed(() => {
  return Math.min(startPage.value + props.maxVisibleButtons - 1, props.totalPages)
})

const pages = computed(() => {
  const range = []

  for (let i = startPage.value; i <= endPage.value; i += 1) {
    range.push({
      name: i,
      isDisabled: i === props.currentPage
    })
  }

  return range
})

const isInFirstPage = computed(() => {
  return props.currentPage === 1
})

const isInLastPage = computed(() => {
  return props.currentPage === props.totalPages
})

function onPageChange(page) {
  emit('pageChanged', page)
}

function isPageActive(page) {
  return props.currentPage === page
}
</script>

<template>
  <nav aria-label="Episodes Page navigation">
    <ul class="inline-flex -pace-x-px h-10">
      <li>
        <button type="button" @click="onPageChange(1)" :disabled="isInFirstPage" aria-label="Go to first page"
          class="flex items-center justify-center px-3 h-10 ms-0 text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-green-custom hover:text-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-yellow-custom dark:hover:text-white disabled:cursor-not-allowed">
          <span class="sr-only">First Page</span>
          <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="m17 16-4-4 4-4m-6 8-4-4 4-4" />
          </svg>
        </button>
      </li>
      <li>
        <button type="button" @click="onPageChange(currentPage - 1)" :disabled="isInFirstPage"
          aria-label="Go to previous page"
          class="flex items-center justify-center px-3 h-10 text-gray-500 bg-white border border-gray-300 hover:bg-green-custom hover:text-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-yellow-custom dark:hover:text-white disabled:cursor-not-allowed">
          <span class="sr-only">Previous</span>
          <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="m14 8-4 4 4 4" />
          </svg>
        </button>
      </li>
      <li v-for="page in pages" :key="page.name">
        <button type="button" @click="onPageChange(page.name)" :disabled="page.isDisabled"
          :aria-label="`Go to page number ${page.name}`" class="flex items-center justify-center px-4 h-10 border" :class="[
            isPageActive(page.name)
              ? 'text-white border-gray-300 bg-green-custom hover:bg-green-custom hover:text-white dark:border-gray-700 dark:bg-yellow-custom dark:text-white'
              : 'text-gray-500 bg-white border-gray-300 hover:bg-green-custom hover:text-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-yellow-custom dark:hover:text-white disabled:cursor-not-allowed'
          ]">
          {{ page.name }}
        </button>
      </li>
      <li>
        <button type="button" @click="onPageChange(currentPage + 1)" :disabled="isInLastPage" aria-label="Go to next page"
          class="flex items-center justify-center px-3 h-10 text-gray-500 bg-white border border-gray-300 hover:bg-green-custom hover:text-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-yellow-custom dark:hover:text-white disabled:cursor-not-allowed">
          <span class="sr-only">Next</span>
          <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="m10 16 4-4-4-4" />
          </svg>
        </button>
      </li>
      <li>
        <button type="button" @click="onPageChange(totalPages)" :disabled="isInLastPage" aria-label="Go to last page"
          class="flex items-center justify-center px-3 h-10 text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-green-custom hover:text-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-yellow-custom dark:hover:text-white disabled:cursor-not-allowed">
          <span class="sr-only">Last Page</span>
          <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="m7 16 4-4-4-4m6 8 4-4-4-4" />
          </svg>
        </button>
      </li>
    </ul>
  </nav>
</template>
