<script setup lang="ts">
import { ref } from 'vue';
defineProps({message:String})
const visible = ref<boolean>(true)
const close = ()=> visible.value = false
</script>

<template>
  <div
    v-if="visible"
    class="bg-red-500 text-white px-4 py-3 rounded flex justify-between items-center shadow-md animate-fade-in"
    role="alert"
  >
    <span class="font-semibold">{{ message }}</span>
    <button @click="close" class="ml-4 text-white text-xl leading-none hover:text-gray-200">
      &times;
    </button>
  </div>
</template>