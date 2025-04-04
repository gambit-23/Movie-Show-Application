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
      <div className="flex justify-center flex-wrap mx-2 my-4 gap-4 sm:gap-6">
        {/* Genre Filter */}
        {genresList.map((genre) => (
          <div
            key={genre}
            onClick={() => handleFilter(genre)}
            className={`${
              currentGenre === genre
                ? "bg-gradient-to-r from-indigo-500 to-indigo-400 text-white font-semibold"
                : "bg-gray-700 text-white bg-opacity-80"
            } cursor-pointer flex justify-center items-center h-[2.5rem] sm:h-[3rem] w-[8rem] sm:w-[9rem] rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg text-sm sm:text-base`}
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
          className="w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3 h-[2.8rem] sm:h-[3rem] bg-gray-800 text-white outline-none px-4 text-base sm:text-xl font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
          placeholder="Search Movies"
        />
      </div>

      {/* Watchlist Table */}
      <div className="bg-gray-900 border border-gray-600 rounded-xl shadow-xl overflow-x-auto px-2 sm:px-4">
        <table className="w-full table-auto text-gray-400 text-center">
          {/* Table Header */}
          <thead className="text-white bg-gradient-to-r from-indigo-600 to-indigo-500 text-sm sm:text-base w-full">
            <tr>
              <th className="text-left px-4 py-3 w-1/4">Name</th>
              <th className="px-2 py-3 w-1/6">
                <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3 justify-center">
                  <div
                    onClick={sortIncrease}
                    className="p-1 cursor-pointer hover:text-indigo-300 transition-all duration-300"
                  >
                    <i className="fa fa-arrow-up" />
                  </div>
                  <div>Rating</div>
                  <div
                    onClick={sortDecrease}
                    className="p-1 cursor-pointer hover:text-indigo-300 transition-all duration-300"
                  >
                    <i className="fa fa-arrow-down" />
                  </div>
                </div>
              </th>
              <th className="px-2 py-3 w-1/6">Popularity</th>
              <th className="px-2 py-3 w-1/6">Genre</th>
              <th className="px-2 py-3 w-1/6">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {watchList
              .filter((movie) => {
                if (currentGenre === "All Genres") return true;
                return genreids[movie.genre_ids[0]] === currentGenre;
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
                  key={index}
                  className="border-b-2 transition-all duration-300 hover:bg-gray-700 hover:text-white text-sm sm:text-base"
                >
                  <td className="flex flex-col sm:flex-row items-center sm:items-start px-4 py-3 gap-3 sm:gap-6">
                    <img
                      className="h-[5rem] sm:h-[6rem] w-auto rounded-lg shadow-md"
                      src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                      alt={movie.original_title}
                    />
                    <div className="text-center sm:text-left font-semibold text-gray-200 max-w-[12rem] sm:max-w-none">
                      {movie.original_title}
                    </div>
                  </td>
                  <td className="px-2 py-3 text-gray-300">
                    {movie.vote_average}
                  </td>
                  <td className="px-2 py-3 text-gray-300">
                    {movie.popularity}
                  </td>
                  <td className="px-2 py-3 text-gray-300">
                    {genreids[movie.genre_ids[0]]}
                  </td>
                  <td className="px-2 py-3">
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
