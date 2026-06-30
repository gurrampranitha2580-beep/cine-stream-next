"use client";

import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";

import { FaHeart, FaRegHeart } from "react-icons/fa";

import { IMAGE_BASE_URL } from "../lib/tmdb";
import { toggleFavorite } from "../store/slices/favoritesSlice";

export default function MovieCard({ movie }) {
  const dispatch = useDispatch();

  const favorites = useSelector((state) => state.favorites.favorites);
  
  console.log("Redux Favorites:", favorites);

  let posterUrl = null;

  if (movie.poster_path) {
    posterUrl = `${IMAGE_BASE_URL}${movie.poster_path}`;
  }

  let releaseYear = "N/A";

  if (movie.release_date) {
    releaseYear = movie.release_date.split("-")[0];
  }

  const favoriteStatus = favorites.some((item) => item.id === movie.id);

  function handleFavoriteClick(event) {
    event.preventDefault();
    dispatch(toggleFavorite(movie));
  }

  return (
    <Link href={`/movie/${movie.id}`} className="movie-card">
      <button
        className="heart-btn"
        onClick={handleFavoriteClick}
        aria-label="Toggle favorite movie"
      >
        {favoriteStatus ? <FaHeart /> : <FaRegHeart />}
      </button>

      {posterUrl ? (
        <img
          src={posterUrl}
          alt={movie.title}
          loading="lazy"
        />
      ) : (
        <div className="no-poster">
          No Image
        </div>
      )}

      <div className="movie-info">
        <h2>{movie.title}</h2>

        <div className="movie-details">
          <span>{releaseYear}</span>
          <span>⭐ {movie.vote_average.toFixed(1)}</span>
        </div>
      </div>
    </Link>
  );
}