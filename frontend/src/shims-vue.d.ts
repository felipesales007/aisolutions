import store from '@/store';
import { url } from '@/services';
import { assets, download } from '@/utils';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: store;
    $url: url;
    $assets: assets;
    $download: download;
  }
}
