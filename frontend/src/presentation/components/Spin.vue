<script setup lang="ts">
defineProps({ loading: Boolean})
</script>

<template>
    <span v-if="loading"
        class="w-5 h-5 border-2 border-t-white border-b-white border-l-transparent border-r-transparent rounded-full animate-spin"></span>
</template>