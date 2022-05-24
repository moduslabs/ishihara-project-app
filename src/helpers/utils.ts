import { Plate } from '../types/plate';
import state from '../store';

const preRenderFirstPlateImage = (url: string): void => {
  const img = document.createElement('img');
  img.src = url;
};

export const capitalizePlateAnswer = (plates: Plate[]): Plate[] => {
  return plates.map(p => ({ ...p, answer: p.answer ? String(p.answer).toUpperCase() : p.answer }));
};

export async function loadPlates(): Promise<void> {
  const response = await fetch('https://b9jdjjz440.execute-api.us-east-1.amazonaws.com/test/plates?limit=15');
  const plates = await response.json();
  state.plates = plates ? plates?.map(plate => ({ ...plate, answer: null })) : null;
  preRenderFirstPlateImage(state.plates[0].url);
}
