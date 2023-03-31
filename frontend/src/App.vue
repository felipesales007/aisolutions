<template>
  <!-- notificações e alertas -->
  <p-toast />

  <!-- conteúdo -->
  <div class="main-page">
    <RouterView />
  </div>

  <!-- rodapé -->
  <p-footer :title="company.name" :logo="company.logo" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  data() {
    return {
      company: {
        name: 'AI Solutions',
        logo: this.$assets('img/logo.png'),
      },
    };
  },
});
</script>
