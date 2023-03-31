<script lang="ts">
import { defineComponent } from 'vue';
import { useVuelidate } from '@vuelidate/core';

export default defineComponent({
  name: 'PValidateAdditional',
  data() {
    return {
      v$: useVuelidate(),
      enter: false,
      submitted: false,
    };
  },
  created() {
    this.eventKeysValidate();
  },
  methods: {
    cleanValidate(id: string, store: string) {
      if (!id) this.$store.dispatch(`${store}/form`, '');
      this.submitted = true;
      this.$nextTick(() => (this.submitted = false));
    },
    eventKeysValidate() {
      window.addEventListener('keyup', () => {
        this.enter = false;
      });

      window.addEventListener('keydown', (e: any) => {
        this.enter = e.key === 'Enter';
      });
    },
  },
});
</script>
