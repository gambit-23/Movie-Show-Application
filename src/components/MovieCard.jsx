import genreids from "../utility/movieGenres";
import PropTypes from "prop-types";

function MovieCard({
  movie,
  handleAddToWatchList,
  handleRemoveFromWatchList,
  watchList,
  onCardClick,
}) {
  const isInWatchList = watchList.some((item) => item.id === movie.id);

  return (
    <div
      onClick={onCardClick}
      className="group w-full bg-gray-900 rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition duration-300 hover:scale-105"
    >
      {/* Poster Image */}
      <div className="relative w-full h-[40vh] sm:h-[280px] overflow-hidden">
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.original_title}
          className="w-full h-full object-cover"
        />

        {/* Hover Overview Overlay (with top padding) */}
        <div className="absolute inset-0 bg-black/80 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 pt-12 px-3 pb-3 text-sm overflow-y-auto">
          {movie.overview.length > 150
            ? movie.overview.slice(0, 150) + "..."
            : movie.overview}
        </div>

        {/* Watchlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            isInWatchList
              ? handleRemoveFromWatchList(movie)
              : handleAddToWatchList(movie);
          }}
          className={`absolute top-2 right-2 z-10 h-9 w-9 rounded-full shadow-md flex items-center justify-center text-xl transition-all duration-300 transform hover:scale-110 active:scale-95 ${
            isInWatchList ? "bg-red-600 text-white" : "bg-yellow-400 text-black"
          }`}
        >
          {isInWatchList ? "−" : "+"}
        </button>
      </div>

      {/* Movie Info */}
      <div className="p-3 bg-gray-800 text-center">
        <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white truncate">
          {movie.original_title}
        </h3>
        <p className="text-gray-400 text-xs mt-1">
          ⭐ {movie.vote_average} · 🔥 {Math.round(movie.popularity)}
        </p>

        {/* Genre Tags */}
        <div className="flex justify-center gap-2 flex-wrap mt-2">
          {movie.genre_ids.slice(0, 2).map((id) => (
            <span
              key={id}
              className="text-[10px] bg-indigo-600 text-white px-2 py-0.5 rounded-full"
            >
              {genreids[id]}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number,
    poster_path: PropTypes.string,
    original_title: PropTypes.string,
    overview: PropTypes.string,
    vote_average: PropTypes.number,
    popularity: PropTypes.number,
    genre_ids: PropTypes.arrayOf(PropTypes.number),
  }).isRequired,
  handleAddToWatchList: PropTypes.func.isRequired,
  handleRemoveFromWatchList: PropTypes.func.isRequired,
  watchList: PropTypes.arrayOf(PropTypes.object).isRequired,
  onCardClick: PropTypes.func.isRequired,
};

export default MovieCard;
