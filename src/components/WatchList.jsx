import { useEffect, useState } from "react";
import genreids from "../utility/movieGenres.js";
import PropTypes from "prop-types";

function WatchList({ watchList, handleRemoveFromWatchList, setWatchList }) {
  const [search, setSearch] = useState("");
  const [genresList, setGenresList] = useState(["All Genres"]);
  const [currentGenre, setCurrentGenre] = useState("All Genres");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const sortIncrease = () => {
    const sortedIncreased = [...watchList].sort(
      (a, b) => a.vote_average - b.vote_average
    );
    setWatchList(sortedIncreased);
  };

  const sortDecrease = () => {
    const sortedDecreased = [...watchList].sort(
      (a, b) => b.vote_average - a.vote_average
    );
    setWatchList(sortedDecreased);
  };

  const handleFilter = (genre) => {
    setCurrentGenre(genre);
  };

  useEffect(() => {
    const temp = watchList.map((movie) => genreids[movie.genre_ids[0]]);
    setGenresList(["All Genres", ...new Set(temp)]);
  }, [watchList]);

  return (
    <div className="pt-16 px-4 sm:px-6 lg:px-8 bg-gray-900 min-h-screen text-sm sm:text-base">
      {/* Genre Filter */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6">
        {genresList.map((genre) => (
          <div
            key={genre}
            onClick={() => handleFilter(genre)}
            className={`${
              currentGenre === genre
                ? "bg-indigo-600 text-white"
                : "bg-gray-800 text-gray-300"
            } cursor-pointer flex justify-center items-center py-2 px-3 sm:px-4 rounded-md sm:rounded-lg text-xs sm:text-sm hover:scale-105 transform transition-all duration-300`}
          >
            {genre}
          </div>
        ))}
      </div>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          onChange={handleSearch}
          value={search}
          type="text"
          className="w-full sm:w-2/3 lg:w-1/2 xl:w-1/3 h-10 sm:h-12 bg-gray-800 text-white rounded-xl px-4 text-sm sm:text-lg font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
          placeholder="Search Movies"
        />
      </div>

      {/* Watchlist Table */}
      <div className="overflow-x-auto bg-gray-800 rounded-xl shadow-xl">
        <table className="min-w-full table-auto text-gray-200 text-center text-xs sm:text-sm">
          {/* Table Header */}
          <thead className="bg-gradient-to-r from-indigo-600 to-indigo-500">
            <tr>
              <th className="text-left px-2 sm:px-4 py-2 sm:py-3">Name</th>
              <th className="px-2 sm:px-4 py-2 sm:py-3">
                <div className="flex items-center justify-center gap-2 sm:gap-3">
                  <div
                    onClick={sortIncrease}
                    className="cursor-pointer hover:text-indigo-400 transition-all duration-300"
                  >
                    <i className="fa fa-arrow-up" />
                  </div>
                  <div>Rating</div>
                  <div
                    onClick={sortDecrease}
                    className="cursor-pointer hover:text-indigo-400 transition-all duration-300"
                  >
                    <i className="fa fa-arrow-down" />
                  </div>
                </div>
              </th>
              <th className="px-2 sm:px-4 py-2 sm:py-3">Popularity</th>
              <th className="px-2 sm:px-4 py-2 sm:py-3">Genre</th>
              <th className="px-2 sm:px-4 py-2 sm:py-3">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {watchList
              .filter(
                (movie) =>
                  currentGenre === "All Genres" ||
                  genreids[movie.genre_ids[0]] === currentGenre
              )
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
                  className="border-b border-gray-600 hover:bg-gray-700 hover:text-white transition-all duration-300"
                >
                  <td className="px-2 sm:px-4 py-3">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                      <img
                        className="w-full sm:w-28 md:w-36 lg:w-44 max-h-40 rounded-lg object-cover shadow-md"
                        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                        alt={movie.original_title}
                      />
                      <div className="font-semibold text-left text-gray-200 text-sm sm:text-base">
                        {movie.original_title}
                      </div>
                    </div>
                  </td>
                  <td className="px-2 sm:px-4 py-3">{movie.vote_average}</td>
                  <td className="px-2 sm:px-4 py-3">{movie.popularity}</td>
                  <td className="px-2 sm:px-4 py-3">
                    {genreids[movie.genre_ids[0]]}
                  </td>
                  <td className="px-2 sm:px-4 py-3">
                    <button
                      onClick={() => handleRemoveFromWatchList(movie)}
                      className="text-red-500 hover:text-red-300 font-bold transition-all duration-300"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

WatchList.propTypes = {
  watchList: PropTypes.arrayOf(
    PropTypes.shape({
      genre_ids: PropTypes.arrayOf(PropTypes.number).isRequired,
      original_title: PropTypes.string.isRequired,
      overview: PropTypes.string.isRequired,
      backdrop_path: PropTypes.string,
      vote_average: PropTypes.number.isRequired,
      popularity: PropTypes.number.isRequired,
    })
  ).isRequired,
  handleRemoveFromWatchList: PropTypes.func.isRequired,
  setWatchList: PropTypes.func.isRequired,
};

export default WatchList;
