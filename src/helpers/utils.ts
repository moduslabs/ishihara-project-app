import { Plate } from '../components/user-input/user-input';
import state from '../store';

export const updateStateWithUserInput = (state: Plate[], updatedPlate: Plate) => {
  return state.map((plate: Plate) => {
    if (plate.url === updatedPlate.url) {
      return { ...plate, ...updatedPlate };
    }
    return plate;
  });
};

export const capitalizePlateAnswer = (plates: Plate[]) => {
  return plates.map(p => ({ ...p, answer: p.answer ? String(p.answer).toUpperCase() : p.answer }));
};

const prefetchPlateImages = (plates: Plate[]) => {
  if (plates) Promise.all(plates.map(p => fetch(p.url)));
};

export async function loadPlates() {
  state.plates = [];
  const response = await fetch('https://b9jdjjz440.execute-api.us-east-1.amazonaws.com/test/plates?limit=8');
  const plates = await response.json();
  state.plates = plates ? plates?.map(plate => ({ ...plate, answer: null })) : null;
  prefetchPlateImages(state.plates);
}
