import getters from './getters';
import actions from './actions';
import mutations from './mutations';

export default {
  namespaced: true,
  state: {
    data: '',
    form: '',
    validate: true,
    submitted: false,
  },
  getters,
  actions,
  mutations,
};
