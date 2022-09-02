import { addFavorite, removeFavorite } from "../reducers/favorites";
import store from "../store";
export const toggleFavorite = (product) => {
  const favorites = store.getState().favorites;
  console.log(favorites);
  for (let i in favorites) {
    let favorite = favorites[i];
    if (favorite._id === product._id) {
      store.dispatch(removeFavorite(i));
      return;
    }
  }
  store.dispatch(
    addFavorite({
      _id: product._id,
      image: product.image,
      name: product.name,
    })
  );
};
