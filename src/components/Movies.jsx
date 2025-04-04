import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import Pagination from "./Pagination";
import TrailerModal from "./TrailerModal"; 

function Movies({
  handleAddToWatchList,
  handleRemoveFromWatchList,
  watchList,
}) {
  const apiKey = import.meta.env.VITE_API_KEY;

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [trailerKey, setTrailerKey] = useState(null); // stores the youtube video key
  const [showModal, setShowModal] = useState(false); // determines whether the modal should be visible or not

  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => prev + 1);

  const fetchTrailer = async (movieId) => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}` //This makes an API call to get videos associated with the movie.
    );
    const trailers = res.data.results;
    const officialTrailer = trailers.find(
      (vid) => vid.type === "Trailer" && vid.site === "YouTube" // From the list of videos, we filter to find a YouTube Trailer
    );
    if (officialTrailer) {
      setTrailerKey(officialTrailer.key);
      setShowModal(true);
    } else {
      alert("Trailer not available");
    }
  };

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`
      )
      .then((res) => setMovies(res.data.results));
  }, [page]);

  return (
    <div className="px-4 sm:px-6 md:px-8 py-6 sm:py-8 bg-gray-800 shadow-lg">
      {/* Heading */}
      <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-6 sm:mb-8">
        <span className="text-teal-400">Trending</span> Movies
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            handleAddToWatchList={handleAddToWatchList}
            handleRemoveFromWatchList={handleRemoveFromWatchList}
            watchList={watchList}
            onCardClick={() => fetchTrailer(movie.id)} 
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 sm:mt-8">
        <Pagination
          handlePrev={handlePrev}
          handleNext={handleNext}
          page={page}
        />
      </div>

      {/* Modal */}
      {showModal && (
        <TrailerModal
          trailerKey={trailerKey}
          closeModal={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default Movies;
