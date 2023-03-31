<template>
  <p-card border shadow body-padding="16px 75px">
    <div class="grid grid-nogutter">
      <!-- mensagem -->
      <div class="col-12 md:col-4">
        <div class="fe-center-y">
          <div class="text-6xl md:text-7xl mb-3">{{ error.title }}</div>
          <div class="text-1xl md:text-2xl mb-3">{{ error.description }}</div>

          <RouterLink
            v-if="$router.options.history.state.back"
            :to="String($router.options.history.state.back)">
            <Button :label="error.button" class="px-5 mt-4" />
          </RouterLink>
        </div>
      </div>

      <!-- imagem -->
      <div class="col-12 md:col-8">
        <div class="flex align-items-center justify-content-center h-full my-0 md:-my-3">
          <img :src="error.image" class="w-20rem md:w-30rem mt-3 mb-0 md:-mb-3" alt="" />
        </div>
      </div>
    </div>
  </p-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      error: {
        title: 'Ops!',
        description: 'Não conseguimos encontrar a página que você está procurando.',
        button: 'Voltar',
        image: this.$assets('img/error.png'),
      },
    };
  },
});
</script>
