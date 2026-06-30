"use client";

import { useSelector } from "react-redux";

import MovieCard from "../../components/MovieCard";

export default function FavoritesPage() {
  const favorites = useSelector((state) => state.favorites.favorites);

  return (
    <main className="page">
      <h1 className="page-title">
        My Favorites
      </h1>

      {favorites.length === 0 ? (
        <h2 className="empty-text">
          No favorite movies added yet.
        </h2>
      ) : (
        <div className="movies-grid compact-grid">
          {favorites.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
            />
          ))}
        </div>
      )}
    </main>
  );
}