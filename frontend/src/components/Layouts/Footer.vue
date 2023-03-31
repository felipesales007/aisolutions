<template>
  <div class="layout-footer">
    <!-- menu -->
    <Menubar :model="[]" class="w-full relative border-noround bottom-0">
      <!-- direita -->
      <template #start>
        <div class="flex align-items-center">
          <img v-if="logo" :src="logo" class="mr-4" height="32" alt="" />
          <div class="text-color mr-4">{{ title }}</div>
        </div>
      </template>

      <!-- esquerda -->
      <template #end>
        <div class="flex align-items-center justify-content-end">
          <div v-if="title" class="text-sm text-color text-right">
            {{ copy }} {{ new Date().getFullYear() }}, {{ rights }}
          </div>
        </div>
      </template>
    </Menubar>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PFooter',
  props: {
    title: {
      type: String,
      default: '',
      description: 'Título',
    },
    logo: {
      type: String,
      default: '',
      description: 'Logomarca da empresa',
    },
  },
  data() {
    return {
      copy: 'Copyright ©',
      rights: 'Todos os direitos reservados',
    };
  },
});
</script>

<style>
.layout-footer {
  padding-top: 1px;
}

.layout-footer .p-menubar {
  height: 54px;
  padding: 16px 16px 17px 16px;
  box-shadow: 0 0 1px 0 rgb(0 0 0 / 75%);
}

.layout-footer .p-menubar-start,
.layout-footer .p-menubar-end {
  width: 50%;
}

.layout-footer .p-menubar-button {
  display: none !important;
}
</style>
