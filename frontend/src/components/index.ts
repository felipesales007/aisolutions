import footer from './Layouts/Footer.vue';
import header from './Layouts/Header.vue';
import toast from './Alerts/Toast.vue';
import card from './Cards/Card.vue';
import fileUpload from './Inputs/FileUpload.vue';

export default {
  install: (app: any) => {
    [footer, header, toast, card, fileUpload].forEach((component: any) => {
      app.component(component.name, component);
    });
  },
};
