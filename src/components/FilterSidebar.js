"use client";

import { useDispatch, useSelector } from "react-redux";
import {
  setGenre,
  setYear,
  resetFilters,
} from "../store/slices/filterSlice";

export default function FilterSidebar() {
  const dispatch = useDispatch();

  const { genre, year } = useSelector((state) => state.filters);

  return (
    <aside className="filter-sidebar">
      <h3>Filters</h3>

      <label>Genre</label>

      <select
        value={genre}
        onChange={(event) =>
          dispatch(setGenre(Number(event.target.value)))
        }
      >
        <option value={0}>All Genres</option>
        <option value={28}>Action</option>
        <option value={35}>Comedy</option>
        <option value={18}>Drama</option>
        <option value={27}>Horror</option>
        <option value={10749}>Romance</option>
      </select>

      <label>Release Year</label>

      <select
        value={year}
        onChange={(event) =>
          dispatch(setYear(event.target.value))
        }
      >
        <option value="all">All Years</option>
        <option value="2025">2025</option>
        <option value="2024">2024</option>
        <option value="2023">2023</option>
        <option value="2022">2022</option>
        <option value="2021">2021</option>
      </select>

      <button
        type="button"
        onClick={() => dispatch(resetFilters())}
      >
        Reset Filters
      </button>
    </aside>
  );
}