import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    favorites: [],
  },
  reducers: {
    loadFavorites(state, action) {
      state.favorites = action.payload;
    },

    toggleFavorite(state, action) {
      const movie = action.payload;

      const alreadyAdded = state.favorites.find(
        (item) => item.id === movie.id
      );

      if (alreadyAdded) {
        state.favorites = state.favorites.filter(
          (item) => item.id !== movie.id
        );
      } else {
        state.favorites.push(movie);
      }

      localStorage.setItem(
        "favorites",
        JSON.stringify(state.favorites)
      );
    },
  },
});

export const {
  loadFavorites,
  toggleFavorite,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;