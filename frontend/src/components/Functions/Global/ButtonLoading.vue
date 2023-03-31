<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PButtonLoading',
  methods: {
    buttonLoading(item: any) {
      const button = document.querySelector(`.${item}`) as any;

      if (button) {
        const icon = button.querySelector('.pi');
        button.classList.add('p-disabled');
        if (icon) icon.classList.add('pi-spin', 'pi-spinner');
      }
    },
    buttonUnloading(item: any) {
      const button = document.querySelector(`.${item}`) as any;

      if (button) {
        const icon = button.querySelector('.pi');
        button.classList.remove('p-disabled');
        if (icon) icon.classList.remove('pi-spin', 'pi-spinner');
      }
    },
  },
});
</script>
