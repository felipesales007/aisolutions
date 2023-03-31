import avatar from 'primevue/avatar';
import breadcrumb from 'primevue/breadcrumb';
import blockui from 'primevue/blockui';
import button from 'primevue/button';
import card from 'primevue/card';
import dialog from 'primevue/dialog';
import divider from 'primevue/divider';
import fileupload from 'primevue/fileupload';
import menubar from 'primevue/menubar';
import message from 'primevue/message';
import progressspinner from 'primevue/progressspinner';
import skeleton from 'primevue/skeleton';
import toast from 'primevue/toast';
import toastservice from 'primevue/toastservice';
import ripple from 'primevue/ripple';
import tooltip from './primevue/tooltip';

export default {
  install: (app: any) => {
    app.use(toastservice);
    app.directive('ripple', ripple);
    app.directive('tooltip', tooltip);
    [
      avatar,
      breadcrumb,
      button,
      blockui,
      card,
      dialog,
      divider,
      fileupload,
      menubar,
      message,
      progressspinner,
      skeleton,
      toast,
    ].forEach((component) => {
      app.component(component.name, component);
    });
  },
};
