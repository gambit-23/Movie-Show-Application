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
  const [trailerKey, setTrailerKey] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => prev + 1);
  const handlePageJump = (targetPage) => {
    if (targetPage && targetPage > 0) {
      setPage(targetPage);
    }
  };

  const fetchTrailer = async (movieId) => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`
      );
      const trailers = res.data.results;
      const officialTrailer = trailers.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
      );
      if (officialTrailer) {
        setTrailerKey(officialTrailer.key);
        setShowModal(true);
        setError("");
      } else {
        setError("Trailer not available.");
        setShowModal(false);
      }
    } catch (err) {
      console.error("Failed to fetch trailer:", err);
      setError("Something went wrong while fetching trailer.");
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`
        );
        setMovies(res.data.results);
        setError("");
      } catch (err) {
        console.error("Error fetching movies:", err);
        setError("Unable to load movies. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page]);

  const handleCardClick = (movie) => {
    fetchTrailer(movie.id);
  };

  return (
    <section className="px-4 sm:px-8 py-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen">
      {/* Heading */}
      <h2 className="text-center text-3xl sm:text-4xl font-bold text-white mb-8">
        🎬 <span className="text-teal-400">Trending</span> Movies
      </h2>

      {/* Error */}
      {error && (
        <div className="text-red-500 text-center font-medium mb-4">{error}</div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="text-white text-center">Loading...</div>
      ) : (
        <>
          {/* Movies Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 px-4 py-6">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                watchList={watchList}
                handleAddToWatchList={handleAddToWatchList}
                handleRemoveFromWatchList={handleRemoveFromWatchList}
                onCardClick={() => handleCardClick(movie)}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-10">
            <Pagination
              handlePrev={handlePrev}
              handleNext={handleNext}
              handlePageJump={handlePageJump}
              page={page}
            />
          </div>
        </>
      )}

      {/* Modal */}
      {showModal && trailerKey && (
        <TrailerModal
          trailerKey={trailerKey}
          closeModal={() => setShowModal(false)}
        />
      )}
    </section>
  );
}

export default Movies;
