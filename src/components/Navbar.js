"use client";

import Link from "next/link";
import { useSelector } from "react-redux";

export default function Navbar() {
  const favorites = useSelector((state) => state.favorites.favorites);

  return (
    <nav className="navbar">
      <h1>CineStream</h1>

      <div className="nav-links">
        <Link href="/">Home</Link>

        <Link href="/favorites">
          {favorites.length > 0
            ? `Favorites (${favorites.length})`
            : "Favorites"}
        </Link>
      </div>
    </nav>
  );
}