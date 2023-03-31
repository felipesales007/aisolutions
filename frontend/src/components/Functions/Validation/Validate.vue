<script lang="ts">
import { defineComponent } from 'vue';
import additional from './ValidateAdditional.vue';

export default defineComponent({
  name: 'PValidate',
  mixins: [additional],
  methods: {
    pMessageRequired(name: string) {
      return `O campo ${name.toLowerCase()} é obrigatório.`;
    },
  },
});
</script>
