import { createStore } from '@stencil/store';

const { state, onChange } = createStore({
  plates: [],
  history: [],
  pushHistory: {
    current: null,
    previous: null,
  },
  loadingPlates: false,
  screenshotPath: null
});

onChange('plates', value => {
  state.plates = value;
  state.loadingPlates = false;
});

onChange('pushHistory', ({ current, previous }) => {
  // maintain linked history stack
  if (previous && current) {
    const pairIdx = state.history.findIndex(h => h.previous === current && h.current === previous);
    if (pairIdx === 0) {
      state.history = state.history.slice(1, state.history.length);
    } else {
      state.history = [{ previous, current }, ...state.history];
    }
  }
});

export default state;
