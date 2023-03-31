<template>
  <div class="layout-header">
    <div class="mx-2">
      <!-- histórico -->
      <div v-if="breadcrumb.length" class="fe-outline border-round">
        <Breadcrumb :home="home" :model="(breadcrumb as [])" />
      </div>

      <!-- corpo -->
      <div
        class="flex flex-wrap align-items-center justify-content-between padding"
        :class="bodyClass">
        <!-- título -->
        <div
          class="flex flex-wrap align-items-center title text-primary text-2xl"
          :class="titleClass">
          <slot v-if="$slots['left']" name="left" />
          {{ title }}
          <slot v-if="$slots['right']" name="right" />
        </div>

        <!-- itens -->
        <div :class="slotClass">
          <span class="slot">
            <slot />
          </span>

          <Button class="fe-hide fe-not-event" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PHeader',
  props: {
    title: {
      type: String,
      default: '',
      description: 'Título da página',
    },
    breadcrumb: {
      type: Array,
      default: () => [],
      description: 'Linha do tempo de navegação',
    },
    titleClass: {
      type: [String, Array, Object],
      default: '',
      description: 'Classes injetadas no título',
    },
    bodyClass: {
      type: [String, Array, Object],
      default: '',
      description: 'Classes injetadas no corpo',
    },
    slotClass: {
      type: [String, Array, Object],
      default: '',
      description: 'Classes injetadas no slot',
    },
  },
  data() {
    return {
      home: {
        icon: 'pi pi-home',
        to: '/',
      },
    };
  },
  computed: {
    padding() {
      return this.breadcrumb.length ? '9px 0 0 0' : '0';
    },
  },
});
</script>

<style>
.layout-header .fe-outline {
  margin: 64px 1px 0 1px;
}

.layout-header .title {
  margin-top: -2px;
  margin-left: -1px;
}

.layout-header .padding {
  padding: v-bind(padding);
}

.layout-header .slot {
  margin-right: -30px;
  z-index: 1;
}
</style>
