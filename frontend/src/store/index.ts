import { createStore } from 'vuex';
import persistedState from 'vuex-persistedstate';
import global from './modules/global';

export default createStore({
  plugins: [persistedState()],
  modules: {
    global,
  },
});
