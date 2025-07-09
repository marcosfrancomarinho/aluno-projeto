<script lang="ts" setup>
import { inject, ref } from 'vue';
import { LOGIN_USER } from '../../shared/keys/Keys.ts';
import { LoginUserUseCase } from '../../application/usecase/LoginUserUseCase.ts';
import ErrorAlert from '../components/ErrorAlert.vue';
import Spin from '../components/Spin.vue';

const loginUserUseCase = inject(LOGIN_USER) as LoginUserUseCase;
const error = ref<Error | null>(null);
const loading = ref<boolean>(false);

const loginUser = async (e: any): Promise<void> => {
  try {
    error.value = null;
    loading.value = true;
    e.preventDefault();
    const { email, password } = Object.fromEntries(new FormData(e.target)) as { email: string, password: string; };
    await loginUserUseCase.login({ email, password });

  } catch (err: any) {
    error.value = err;
  } finally {
    loading.value = false;
  }
}


</script>


<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
    <ErrorAlert v-if="error" :message="error.message" />
    <div class="bg-white w-full max-w-md sm:max-w-lg p-6 sm:p-6 lg:p-6 rounded-2xl shadow-md">
      <h2 class="text-xl sm:text-2xl lg:text-3xl font-semibold text-center text-gray-800 mb-6">
        Área destinada para admins
      </h2>
      <form v-on:submit="loginUser" class="space-y-5">
        <div>
          <label for="email" class="block text-sm sm:text-base font-medium text-gray-700">Email</label>
          <input type="email" name="email" id="email" required
            class="mt-1 w-full px-4 py-2 sm:py-3 border border-gray-300 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label for="password" class="block text-sm sm:text-base font-medium text-gray-700">Senha</label>
          <input type="password" name="password" id="password"
            class="mt-1 w-full px-4 py-2 sm:py-3 border border-gray-300 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div class="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4">
          <button type="submit"
            class="w-full sm:w-auto relative flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 sm:px-6 sm:py-2.5 rounded-lg hover:bg-blue-700 transition">
            <Spin :loading="loading" />
            Entrar
          </button>
          <button type="reset"
            class="w-full sm:w-auto cursor-pointer bg-gray-300 text-gray-800 px-4 py-2 sm:px-6 sm:py-2.5 rounded-lg hover:bg-gray-400 transition">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
