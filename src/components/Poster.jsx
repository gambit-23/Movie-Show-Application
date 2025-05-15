import { useEffect, useState } from "react";
import axios from "axios";
import TrailerModal from "./TrailerModal.jsx";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

function Banner({ handleAddToWatchList, watchList = [] }) {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [bannerMovie, setBannerMovie] = useState();
  const [showModal, setShowModal] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
      )
      .then((res) => {
        setBannerMovie(res.data.results[0]);
      });
  }, []);

  // Fetch the trailer for the movie
  const fetchTrailer = async (movieId) => {
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
    } else {
      toast.error("Trailer not available");
    }
  };

  // Add movie to the watchlist
  // const isInWatchList = watchList.some((movie) => movie.id === bannerMovie?.id);

  // const handleAddToWatchlist = () => {
  //   if (isInWatchList) {
  //     toast.warning("Already in your watchlist");
  //   } else {
  //     handleAddToWatchList(bannerMovie);
  //     toast.success("Added to your watchlist");
  //   }
  // };

  const bgImage = bannerMovie?.backdrop_path
    ? `https://image.tmdb.org/t/p/original/${bannerMovie.backdrop_path}`
    : "";

  return (
    <div className="relative w-full h-[30vh] sm:h-[50vh] md:h-[70vh] lg:h-[80vh] overflow-hidden shadow-2xl">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-500 scale-105"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20"></div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex flex-col justify-end p-6 sm:p-10 text-white">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold drop-shadow-lg mb-2">
          {bannerMovie?.title ||
            bannerMovie?.name ||
            bannerMovie?.original_name}
        </h1>

        <p className="hidden sm:block max-w-2xl text-sm sm:text-base md:text-lg opacity-80 line-clamp-3">
          {bannerMovie?.overview}
        </p>

        <div className="mt-4 flex gap-3">
          <button
            onClick={() => fetchTrailer(bannerMovie?.id)}
            className="bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-2 rounded-full text-sm sm:text-base font-semibold transition"
          >
            Watch Trailer
          </button>
          {/* <button
            onClick={handleAddToWatchlist}
            className={`${
              isInWatchList
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-white hover:bg-gray-200"
            } text-black px-4 py-2 rounded-full text-sm sm:text-base font-semibold transition`}
            disabled={isInWatchList}
          >
            {isInWatchList ? "Added" : "Add to Watchlist"}
          </button> */}
        </div>
      </div>

      {/* Trailer Modal */}
      {showModal && (
        <TrailerModal
          trailerKey={trailerKey}
          closeModal={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

Banner.propTypes = {
  handleAddToWatchList: PropTypes.func,
  watchList: PropTypes.array,
};

export default Banner;
