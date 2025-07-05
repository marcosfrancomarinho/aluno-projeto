<template>
  <footer class="text-white bg-black flex flex-col gap-15 py-5 px-2">
    <div class="flex flex-col gap-8 sm:flex-row sm:justify-between">
      <div class="flex items-center">
        <router-link to="/">
          <img src="/icons/logo_brand.png" alt="Logo da empresa" width="80" />
        </router-link>
        <h2 class="font-medium text-xs sm:text-sm">O Essencial é Compartilhar o Saber.</h2>
      </div>
      <nav class="flex justify-center space-x-8 font-medium sm:items-center sm:px-5">
        <router-link to="/"> Início </router-link>
        <router-link to="/login"> Entrar </router-link>
        <router-link to="/contato"> Contato </router-link>
      </nav>
    </div>
    <div class="flex justify-center text-gray-600">
      <h2 class="border-t text-center px-15 py-3">
        Curso Livres &copy;{{ new Date().getFullYear() }}. Todos os direitos Reservados.
      </h2>
    </div>
  </footer>
</template>
