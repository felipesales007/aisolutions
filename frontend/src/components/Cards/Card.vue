<template>
  <div class="card-custom" :class="columns">
    <div class="grid grid-nogutter">
      <!-- carregando -->
      <Skeleton
        v-if="skeleton"
        :height="skeletonHeight + 'px'"
        class="fadein animation-duration-1000" />

      <!-- cartão -->
      <BlockUI :blocked="blocked" class="w-full">
        <Card v-show="!skeleton" :class="[bodyClass, { 'fe-outline': border }]" @click="click">
          <!-- slot de topo -->
          <template v-if="$slots['header']" #header>
            <slot name="header" />
          </template>

          <!-- título -->
          <template v-if="title" #title>
            <div class="flex align-items-center -mt-1">
              <!-- esquerda -->
              <slot v-if="$slots['title-left']" name="title-left" />

              <div class="inline-block" :class="titleClass" v-html="title" />

              <!-- direita -->
              <slot v-if="$slots['title-right']" name="title-right" />
            </div>
          </template>

          <!-- sub-título -->
          <template v-if="subTitle" #subtitle>
            <div class="flex align-items-center">
              <!-- esquerda -->
              <slot v-if="$slots['sub-title-left']" name="sub-title-left" />

              <div :class="subTitleClass" v-html="subTitle" />

              <!-- direita -->
              <slot v-if="$slots['sub-title-right']" name="sub-title-right" />
            </div>
          </template>

          <!-- corpo -->
          <template #content>
            <!-- loading -->
            <div v-if="loading" class="flex align-items-center">
              <!-- spinner -->
              <div class="-mb-1">
                <ProgressSpinner
                  style="width: 35px; height: 35px"
                  stroke-width="3"
                  fill="var(--surface-ground)"
                  animation-duration=".5s" />
              </div>

              <!-- texto -->
              <div class="text-gray-600 ml-3 mb-1" :class="loadingTextClass">
                {{ loadingText }}
              </div>
            </div>

            <slot />
          </template>

          <!-- rodapé -->
          <template v-if="$slots['footer']" #footer>
            <slot name="footer" />
          </template>
        </Card>
      </BlockUI>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PCard',
  props: {
    col: {
      type: Array,
      default: () => [12, 12, 12, 12, 12],
      description:
        'Tamanho da coluna [telefones, telefones, tablets, notebooks, monitores] entre (1 à 12)',
    },
    title: {
      type: String,
      default: '',
      description: 'Título',
    },
    titleClass: {
      type: [String, Array, Object],
      default: '',
      description: 'Classes injetadas no título',
    },
    subTitle: {
      type: String,
      default: '',
      description: 'Subtítulo',
    },
    subTitleClass: {
      type: [String, Array, Object],
      default: '',
      description: 'Classes injetadas no sub-título',
    },
    bodyClass: {
      type: [String, Array, Object],
      default: '',
      description: 'Classes injetadas no corpo',
    },
    bodyPadding: {
      type: String,
      default: '16px',
      description: 'Espaçamento laterais interno',
    },
    contentPadding: {
      type: String,
      default: '0',
      description: 'Espaçamento vertical',
    },
    border: {
      type: Boolean,
      default: false,
      description: 'Bordas em torno',
    },
    shadow: {
      type: Boolean,
      default: false,
      description: 'Sombras em torno',
    },
    blocked: {
      type: Boolean,
      default: false,
      description: 'Bloqueio do cartão',
    },
    loading: {
      type: Boolean,
      default: false,
      description: 'Spinner de carregamento',
    },
    loadingText: {
      type: String,
      default: 'carregando',
      description: 'Spinner de carregamento',
    },
    loadingTextClass: {
      type: [String, Array, Object],
      default: '',
      description: 'Classes injetadas no corpo',
    },
    skeleton: {
      type: Boolean,
      default: false,
      description: 'Skeleton de carregamento',
    },
    skeletonHeight: {
      type: [Number, String],
      default: 200,
      description: 'Tamanho da animação de carregamento',
    },
  },
  emits: ['click-card'],
  computed: {
    columns() {
      const col = [] as any;

      this.col.forEach((item: number, index: number) => {
        if (index === 0) col.push(`col-${item}`);
        if (index === 1) col.push(`sm:col-${item}`);
        if (index === 2) col.push(`md:col-${item}`);
        if (index === 3) col.push(`lg:col-${item}`);
        if (index === 4) col.push(`xl:col-${item}`);
      });

      return col.join(' ');
    },
    boxShadow() {
      return this.shadow ? '0 3px 6px #00000029' : 'none';
    },
  },
  methods: {
    click() {
      this.$emit('click-card');
    },
  },
});
</script>

<style>
.card-custom .p-card {
  box-shadow: v-bind(boxShadow) !important;
}

.card-custom .p-card-body {
  padding: v-bind(bodyPadding) !important;
}

.card-custom .p-card-content {
  padding: v-bind(contentPadding) 0 !important;
}

.card-custom .p-card .p-card-footer {
  padding: 8px 0 0 0;
}

.card-custom .p-blockui {
  border-radius: 4px;
  z-index: 1 !important;
}
</style>
