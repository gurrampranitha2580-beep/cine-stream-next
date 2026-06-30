"use client";

import { useCallback, useEffect,useMemo, useRef, useState } from "react";

import { useSelector } from "react-redux";

import FilterSidebar from "./FilterSidebar";

import MovieCard from "./MovieCard";

export default function SearchSection({ popularMovies }) {
  const [searchText, setSearchText] = useState("");
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [visibleMovies, setVisibleMovies] = useState(popularMovies);

  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loaderRef = useRef(null);
  const { genre, year } = useSelector((state) => state.filters);

  const isSearchActive = searchText.trim() !== "";

  const loadMoreMovies = useCallback(async () => {
    if(loadingMore || !hasMore){
      return;
    }

    try{
      setLoadingMore(true);

      const nextPage = page + 1;

      const response = await fetch(`/api/popular?page=${nextPage}`);
      const data = await response.json();

      setVisibleMovies((oldMovies) => {
        const combinedMovies = [...oldMovies, ...(data.results || [])];

        const uniqueMovies = combinedMovies.filter((movie,index,self) =>
          index === self.findIndex((item) => item.id === movie.id)
        );

        return uniqueMovies;
      });

      setPage(nextPage);

      if(nextPage >= data.total_pages){
        setHasMore(false);
      }
    }
    catch(error){
      console.log("Movie fetch error:", error);
    }
    finally{
      setLoadingMore(false);
    }
  }, [page, loadingMore, hasMore]);

  useEffect(() => {
    if(isSearchActive){
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      const firstEntry = entries[0];

      if(firstEntry.isIntersecting){
        loadMoreMovies();
      }
    });

    const currentLoader = loaderRef.current;

    if(currentLoader){
      observer.observe(currentLoader);
    }

    return () => {
      if(currentLoader){
        observer.unobserve(currentLoader);
      }
    };
  }, [isSearchActive, loadMoreMovies]);

  useEffect(() => {
    const trimmedText = searchText.trim();

    if(trimmedText === ""){
      return;
    }

    const timer = setTimeout(async () => {
      try{
        setLoading(true);

        const response = await fetch(
          `/api/search?query=${encodeURIComponent(trimmedText)}`
        );

        const data = await response.json();

        setSearchedMovies(data.results || []);
        setHasSearched(true);
      }
      catch(error){
        console.log("Search error:", error);
        setSearchedMovies([]);
        setHasSearched(true);
      }
      finally{
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchText]);

  function handleSearchChange(event) {
    const value = event.target.value;

    setSearchText(value);

    if(value.trim() === ""){
      setSearchedMovies([]);
      setHasSearched(false);
      setLoading(false);
    }
  }

  const moviesToShow = isSearchActive ? searchedMovies : visibleMovies;
  
  const filteredMovies = useMemo(() => {
    return moviesToShow.filter((movie) => {
      let matchesGenre = true;
      let matchesYear = true;
      if (genre !== 0) {
        matchesGenre = movie.genre_ids?.includes(genre);
      }
      if (year !== "all") {
        matchesYear =
        movie.release_date &&
        movie.release_date.startsWith(year);
      }
      return matchesGenre && matchesYear;
    });
  }, [moviesToShow, genre, year]);

  return(
    <section className="search-section">

      <input
        type="text"
        placeholder="Search movies..."
        value={searchText}
        onChange={handleSearchChange}
        suppressHydrationWarning
      />
      <div className="movies-layout">

  <FilterSidebar />

  <div className="movies-content">

    {loading && (
      <p className="search-status">
        Searching...
      </p>
    )}

    {isSearchActive &&
      hasSearched &&
      !loading &&
      searchedMovies.length === 0 && (
        <p className="empty-text">
          No movies found.
        </p>
      )}

    {filteredMovies.length > 0 && (
      <div
        className={
          isSearchActive
            ? "movies-grid compact-grid"
            : "movies-grid"
        }
      >
        {filteredMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
          />
        ))}
      </div>
    )}

  </div>

</div>

      {!isSearchActive && hasMore && (
        <div ref={loaderRef} className="scroll-loader">
          {loadingMore ? "Loading more movies..." : "Scroll for more"}
        </div>
      )}

    </section>
  );
}