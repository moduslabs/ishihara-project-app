import { createStore } from "@stencil/store";


const { state, onChange } = createStore({
  plates: []
});

onChange('plates', value => {
  state.plates = value;
});

export default state;