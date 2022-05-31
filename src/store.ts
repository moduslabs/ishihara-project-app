import { createStore } from '@stencil/store';

const { state, onChange } = createStore({
  plates: [],
  loadingPlates: false,
});

onChange('plates', value => {
  state.plates = value;
  state.loadingPlates = false;
});

export default state;
