import { configureStore } from "@reduxjs/toolkit";

import favoritesReducer from "./slices/favoritesSlice";
import filterReducer from "./slices/filterSlice";

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    filters: filterReducer,
  },
});