import { Plate } from '../types/plate';
import state from '../store';

export const capitalizePlateAnswer = (plates: Plate[]) => {
  return plates.map(p => ({ ...p, answer: p.answer ? String(p.answer).toUpperCase() : p.answer }));
};

const preRenderFristPlateImage = (url) => {
  const img = document.createElement('img');
  img.src = url
};

export async function loadPlates() {
  const response = await fetch('https://b9jdjjz440.execute-api.us-east-1.amazonaws.com/test/plates?limit=15');
  const plates = await response.json();
  state.plates = plates ? plates?.map(plate => ({ ...plate, answer: null })) : null;
  preRenderFristPlateImage(state.plates[0].url);
}
