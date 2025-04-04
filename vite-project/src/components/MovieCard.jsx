import React from "react";

function MovieCard({
  handleAddToWatchList,
  movie,
  handleRemoveFromWatchList,
  watchList,
}) {
  function doesContain(movie) {
    for (let i = 0; i < watchList.length; i++) {
      if (watchList[i].id == movie.id) {
        return true;
      }
    }
    return false;
  }

  return (
    <div
      className="h-[40vh] w-[200px] bg-center bg-cover rounded-2xl hover:scale-105 transition-transform duration-300 hover:cursor-pointer flex flex-col justify-between items-end relative"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.poster_path})`,
      }}
    >
      {/* Container for the buttons and text to apply overlay effect only to those sections */}
      <div className="absolute inset-0 flex flex-col justify-between items-end p-4">
        {/* Remove or Add to Watchlist Button */}
        {doesContain(movie) ? (
          <div
            onClick={() => handleRemoveFromWatchList(movie)}
            className="p-2 flex justify-center items-center h-10 w-10 rounded-full bg-red-600/70 hover:bg-red-700 transition-all ease-in-out"
          >
            <span className="text-white text-2xl">&#10060;</span>
          </div>
        ) : (
          <div
            onClick={() => handleAddToWatchList(movie)}
            className="p-2 flex justify-center items-center h-10 w-10 rounded-full bg-yellow-400/70 hover:bg-yellow-500 transition-all ease-in-out"
          >
            <span className="text-white text-2xl">&#128525;</span>
          </div>
        )}

        {/* Title Section */}
        <div className="mt-4 w-full p-4 bg-gradient-to-t from-black/80 to-transparent rounded-b-2xl text-white text-xl font-semibold text-center">
          {movie.original_title}
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
