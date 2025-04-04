import { React, useEffect, useState } from "react";
// import "font-awesome/css/font-awesome.min.css";
import genreids from "../utility/movieGenres";

function WatchList({ watchList, handleRemoveFromWatchList, setWatchList }) {
  const [search, setSearch] = useState("");
  const [genresList, setGenresList] = useState(["All Genres"]);
  const [currentGenre, setCurrentGenre] = useState("All Genres");
  let handleSearch = (e) => {
    setSearch(e.target.value);
  };

  let sortIncrease = () => {
    let sortedincreasing = watchList.sort((a, b) => {
      return a.vote_average - b.vote_average;
    });
    setWatchList([...sortedincreasing]);
  };
  let sortDecrease = () => {
    let sortedecreasing = watchList.sort((a, b) => {
      return b.vote_average - a.vote_average;
    });
    setWatchList([...sortedecreasing]);
  };
  let handleFilter = (genre) => {
    setCurrentGenre(genre);
  };

  useEffect(() => {
    let temp = watchList.map((movie) => {
      return genreids[movie.genre_ids[0]];
    });
    temp = [...new Set(temp)];
    setGenresList(["All Genres", ...temp]);
    console.log(genresList);
  }, [watchList]);

  return (
    <>
  <div className="flex justify-center flex-wrap m-6 gap-6">
  {/* Genre Filter */}
  {genresList.map((genre) => (
    <div
      onClick={() => handleFilter(genre)}
      className={`${
        currentGenre === genre
          ? "bg-gradient-to-r from-indigo-500 to-indigo-400 text-white font-semibold cursor-pointer"
          : "bg-gray-700 text-white bg-opacity-80 cursor-pointer"
      } flex justify-center items-center h-[3rem] w-[9rem] rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg`}
    >
      {genre}
    </div>
  ))}
</div>

{/* Search Bar */}
<div className="flex justify-center my-6">
  <input
    onChange={handleSearch}
    value={search}
    type="text"
    className="w-1/3 h-[3rem] bg-gray-800 text-white outline-none px-4 text-xl font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
    placeholder="Search Movies"
  />
</div>

{/* Watchlist Table */}
<div className="bg-gray-900 border border-gray-600 rounded-xl shadow-xl overflow-hidden">
  <table className="w-full text-gray-400 text-center">
    {/* Table Header */}
    <thead className="border-b-3 text-white bg-gradient-to-r from-indigo-600 to-indigo-500">
      <tr>
        <th className="text-left px-5 py-3">Name</th>
        <th className="flex gap-3 justify-center">
          <div onClick={sortIncrease} className="p-2 cursor-pointer hover:text-indigo-300 transition-all duration-300">
            <i className="fa fa-arrow-up" />
          </div>
          <div className="p-2">Rating</div>
          <div onClick={sortDecrease} className="p-2 cursor-pointer hover:text-indigo-300 transition-all duration-300">
            <i className="fa fa-arrow-down" />
          </div>
        </th>
        <th>Popularity</th>
        <th>Genre</th>
        <th>Actions</th>
      </tr>
    </thead>

    {/* Table Body */}
    <tbody>
      {watchList
        .filter((movie) => {
          if (currentGenre === "All Genres") {
            return true;
          } else {
            return genreids[movie.genre_ids[0]] === currentGenre;
          }
        })
        .filter((movie) => {
          return (
            movie.original_title
              .toLowerCase()
              .includes(search.toLowerCase()) ||
            movie.overview.toLowerCase().includes(search.toLowerCase())
          );
        })
        .map((movie, index) => (
          <tr
            className="border-b-2 transition-all duration-300 hover:bg-gray-700 hover:text-white"
            key={index}
          >
            <td className="flex items-center px-6 py-4">
              <img
                className="h-[6rem] w-auto rounded-lg shadow-md"
                src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                alt={movie.original_title}
              />
              <div className="mx-10 font-semibold text-gray-200">{movie.original_title}</div>
            </td>
            <td className="text-gray-300">{movie.vote_average}</td>
            <td className="text-gray-300">{movie.popularity}</td>
            <td className="text-gray-300">{genreids[movie.genre_ids[0]]}</td>
            <td>
              <button
                onClick={() => handleRemoveFromWatchList(movie)}
                className="font-bold text-red-700 hover:text-red-500 transition-all duration-300"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
    </tbody>
  </table>
</div>
    </>
  );
}

export default WatchList;
