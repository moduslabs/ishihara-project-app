import { Plate } from '../components/user-input/user-input';

export const updateStateWithUserInput = (state: Plate[], updatedPlate: Plate) => {
  return state.map((plate: Plate) => {
    if (plate.url === updatedPlate.url) {
      return { ...plate, ...updatedPlate };
    }
    return plate;
  });
};

export async function fetchPlates() {
  const response = await fetch('https://b9jdjjz440.execute-api.us-east-1.amazonaws.com/test/plates?limit=8');
  return response.json();
}
