import { createApp } from 'vue';
import { axios, url } from './services';
import { plugins, locale } from './global';
import { notify, assets, download } from './utils';

import App from './App.vue';
import router from './router';
import store from './store';
import primevue from 'primevue/config';
import components from './components';

import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.min.css';

import './assets/css/light.css';
import './assets/css/edit.css';
import './assets/css/global.css';

const app = createApp(App);
const global = app.config.globalProperties;

global.$axios = axios;
global.$url = url;
global.$notify = notify;
global.$assets = assets;
global.$download = download;

app.use(router);
app.use(store);
app.use(primevue, { locale, ripple: true });
app.use(plugins);
app.use(components);

app.mount('#app');
