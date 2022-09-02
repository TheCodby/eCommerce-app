import { createSlice } from "@reduxjs/toolkit";

const favorites = createSlice({
  name: "favorites",
  initialState: [],
  reducers: {
    addFavorite: (state, action) => {
      state.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.splice(action.payload.index, 1);
    },
  },
});
export const addFavorite = favorites.actions.addFavorite;
export const removeFavorite = favorites.actions.removeFavorite;
export default favorites.reducer;
