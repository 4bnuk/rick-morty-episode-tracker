<script setup>
import { useModalStore } from '@/stores/modal'

const store = useModalStore()
</script>

<template>
  <Teleport to="body">
    <Transition enter-from-class="opacity-0 scale-125" enter-to-class="opacity-100 scale-100"
      enter-active-class="transition duration-300" leave-active-class="transition duration-200"
      leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-125">
      <div v-if="store.show" tabindex="-1" aria-hidden="true"
        class="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50 overflow-y-auto overflow-x-hidden">
        <div class="w-full max-w-2xl max-h-full p-4">
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white"> {{ store.title }} </h3>
              <button type="button" @click="store.close" aria-label="Close modal"
                class="w-8 h-8 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 14 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
            </div>
            <div class="p-4 md:p-5 space-y-4">
              <p class="text-base leading-relaxed text-gray-500 dark:text-gray-100">{{ store.message }}</p>
            </div>
            <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button type="button" @click="store.close"
                class="px-5 py-2.5 text-sm font-medium text-white bg-red-custom hover:bg-green-custom text-center dark:bg-red-custom dark:hover:bg-yellow-custom rounded-lg">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
