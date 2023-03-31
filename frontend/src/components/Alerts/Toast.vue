<template>
  <div class="alert-toast">
    <Toast :breakpoints="breakpoints" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PToast',
  data() {
    return {
      breakpoints: {
        '767px': {
          width: '100%',
          right: '0',
          left: '0',
        },
      },
    };
  },
});
</script>
