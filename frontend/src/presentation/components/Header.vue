<script lang="ts" setup>
import { ref } from 'vue';

const show = ref(false);
const openMenu = () => (show.value = !show.value);
</script>

<template>
  <header class="bg-black text-white flex flex-col px-4 py-4 sm:flex-row sm:justify-between sm:items-center">
    <div class="flex justify-between items-center">
      <router-link to="/">
        <img src="/icons/logo_brand.png" alt="Logo da empresa" width="130" />
      </router-link>
      <button type="button" aria-label="Abrir menu" class="sm:hidden" @click="openMenu">
        <img :src="show ? '/icons/close.svg' : '/icons/bars.svg'" alt="Ícone de menu" />
      </button>
    </div>

    <nav
      :class="[
        'sm:flex sm:items-center sm:space-x-8 sm:mt-0 sm:space-y-0',
        show ? 'flex flex-col mt-4 space-y-8 px-5 py-2 font-medium' : 'hidden',
      ]"
    >
      <router-link
        class="text-xl sm:opacity-80 sm:border-y-2 sm:py-2 border-transparent px-1 sm:hover:opacity-100 transition-all duration-300"
        active-class="sm:opacity-100 border-white"
        to="/"
      >
        Início
      </router-link>
      <router-link
        class="text-xl sm:opacity-80 sm:border-y-2 sm:py-2 border-transparent px-1 sm:hover:opacity-100 transition-all duration-300"
        active-class="sm:opacity-100 border-white"
        to="/login"
      >
        Entrar
      </router-link>
      <router-link
        class="text-xl sm:opacity-80 sm:border-y-2 sm:py-2 border-transparent px-1 sm:hover:opacity-100 transition-all duration-300"
        active-class="sm:opacity-100 border-white"
        to="/contato"
      >
        Contato
      </router-link>
    </nav>
  </header>
</template>
