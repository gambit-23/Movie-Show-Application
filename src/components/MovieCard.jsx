function MovieCard({
  movie,
  handleAddToWatchList,
  handleRemoveFromWatchList,
  watchList,
  onCardClick, // ✅ new prop
}) {
  const isInWatchList = watchList.some((item) => item.id === movie.id);

  return (
    <div
      onClick={onCardClick} // ✅ click to trigger trailer fetch
      className="h-[35vh] sm:h-[40vh] w-[45vw] sm:w-[200px] bg-center bg-cover rounded-2xl hover:scale-105 transition-transform duration-300 hover:cursor-pointer flex flex-col justify-between items-end relative"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.poster_path})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 flex flex-col justify-between items-end p-2 sm:p-4">
        <div
          onClick={(e) => {
            e.stopPropagation();
            isInWatchList
              ? handleRemoveFromWatchList(movie)
              : handleAddToWatchList(movie);
          }}
          className={`p-1.5 sm:p-2 flex justify-center items-center h-8 sm:h-10 w-8 sm:w-10 rounded-full ${
            isInWatchList
              ? "bg-red-600/70 hover:bg-red-700"
              : "bg-yellow-400/70 hover:bg-yellow-500"
          } transition-all ease-in-out`}
        >
          <span className="text-white text-xl sm:text-2xl">
            {isInWatchList ? "❌" : "💛"}
          </span>
        </div>

        {/* Title */}
        <div className="mt-3 w-full px-2 py-3 sm:p-4 bg-gradient-to-t from-black/80 to-transparent rounded-b-2xl text-white text-center text-sm sm:text-lg font-semibold">
          {movie.original_title}
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
