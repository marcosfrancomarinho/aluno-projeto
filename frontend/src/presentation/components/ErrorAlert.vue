<script setup lang="ts">
import { onMounted, ref, } from 'vue';
defineProps({ message: String });
const visible = ref<boolean>(true);
const close = () => visible.value = false;
const time = () => setTimeout(() => { visible.value = false; }, 3000);
onMounted(() => time());
</script>

<template>
  <div v-show="visible"
    class="bg-red-500 mb-2 absolute top-12 text-white px-4 py-3 rounded flex justify-between items-center shadow-md animate-fade-in"
    role="alert">
    <span class="font-semibold">{{ message }}</span>
    <button @click="close" class="ml-4 text-white text-xl leading-none hover:text-gray-200">
      &times;
    </button>
  </div>
</template>