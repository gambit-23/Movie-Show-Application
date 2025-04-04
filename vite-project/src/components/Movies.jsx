import MovieCard from "./MovieCard";
import { useEffect, useState, React } from "react";
import axios from "axios";
import Pagination from "./Pagination";

function Movies({
  handleAddToWatchList,
  handleRemoveFromWatchList,
  watchList,
}) {

  const apiKey = import.meta.env.VITE_API_KEY;
  
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  const handlePrev = () => {
    if (page === 1) setPage(1);
    else setPage(page - 1);
  };

  const handleNext = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`
      )
      .then((res) => {
        setMovies(res.data.results);
      });
  }, [page]);

  return (
    <div className="p-8 bg-gray-800 shadow-lg">
  {/* Heading Section */}
  <div className="text-3xl font-bold text-white text-center mb-8">
    <span className="text-teal-400">Trending</span> Movies
  </div>

  {/* Movies Container */}
  <div className="flex flex-row flex-wrap justify-center gap-8">
    {movies.map((movie) => (
      <MovieCard
        key={movie.id} // Make sure to add the key prop for efficient rendering
        movie={movie}
        handleAddToWatchList={handleAddToWatchList}
        handleRemoveFromWatchList={handleRemoveFromWatchList}
        watchList={watchList}
      />
    ))}
  </div>

  {/* Pagination Section */}
  <div className="flex justify-center mt-8 ">
    <Pagination handlePrev={handlePrev} handleNext={handleNext} page={page} />
  </div>
</div>
  );
}

export default Movies;
