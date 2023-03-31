export default {
  data(state: any, payload: any) {
    state.commit('data', payload);
  },
  form(state: any, payload: any) {
    state.commit('form', payload);
  },
  validate(state: any, payload: any) {
    state.commit('validate', payload);
  },
  submitted(state: any, payload: any) {
    state.commit('submitted', payload);
  },
};
