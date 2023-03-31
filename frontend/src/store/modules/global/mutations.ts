export default {
  data(state: any, payload: any) {
    state.data = payload;
  },
  form(state: any, payload: any) {
    state.form = payload;
  },
  validate(state: any, payload: any) {
    state.validate = payload;
  },
  submitted(state: any, payload: any) {
    state.submitted = payload;
  },
};
