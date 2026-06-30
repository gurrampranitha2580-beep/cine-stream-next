"use client";

import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";

import { store } from "./store";
import { loadFavorites } from "./slices/favoritesSlice";

function StoreInitializer({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const savedItems = localStorage.getItem("favorites");

    if (savedItems) {
      dispatch(loadFavorites(JSON.parse(savedItems)));
    }
  }, [dispatch]);

  return children;
}

export default function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      <StoreInitializer>
        {children}
      </StoreInitializer>
    </Provider>
  );
}