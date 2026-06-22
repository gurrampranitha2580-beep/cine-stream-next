# CineStream Next.js Migration

## Project Overview

CineStream is a movie discovery application built using Next.js 15 and TMDB API.

This project is an upgrade of the previous React SPA version. The application now utilizes Server-Side Rendering (SSR), App Router, dynamic routing, and metadata generation for improved SEO and performance.

---

## Features

### Popular Movies

* Fetches popular movies from TMDB
* Initial data rendered on the server
* Responsive movie card layout

### Movie Search

* Search movies by title
* Debounced search requests
* Displays "No movies found" when results are unavailable

### Movie Details

* Dynamic route using `/movie/[id]`
* Displays poster, overview, release date, runtime, and rating
* SEO metadata generated dynamically

### Favorites

* Add and remove favorite movies
* Favorites stored in localStorage
* Favorites page with count in navbar
* Favorites persist after refresh

### Infinite Scroll

* Automatically loads additional popular movies while scrolling
* Prevents duplicate movie entries

---

## Technologies Used

* Next.js 15
* React
* TMDB API
* Context API
* CSS
* App Router

---

## Routing Structure

* `/` → Home Page
* `/favorites` → Favorites Page
* `/movie/[id]` → Movie Details Page

---

## Setup

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Build production version:

```bash
npm run build
```

---

## Environment Variable

Create `.env.local`

```env
TMDB_KEY=YOUR_TMDB_API_KEY
```
