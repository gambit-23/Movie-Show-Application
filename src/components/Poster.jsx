import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
function Banner() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [bannerMovie, setBannerMovie] = useState();
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
      )
      .then((res) => {
        setBannerMovie(res.data.results[0]);
      });
  }, []); // this will run only when the component mounts, not on every render
  console.log(bannerMovie);

  return (
    <div
      className="h-[30vh] sm:h-[40vh] md:h-[70vh] lg:h-[75vh] bg-cover bg-center flex items-end mb-4 shadow-xl transition-all duration-300"
      style={{
        backgroundImage: `url('${
          bannerMovie?.backdrop_path
            ? `https://image.tmdb.org/t/p/original/${bannerMovie?.backdrop_path}`
            : ""
        }')`,
      }}
    >
      {/* Text Overlay with Responsive Styling */}
      <div className="w-full bg-gradient-to-t from-gray-900 via-transparent to-transparent px-4 py-6 text-white text-center">
        <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold">
          {bannerMovie?.title ||
            bannerMovie?.name ||
            bannerMovie?.original_name}
        </h1>
      </div>
    </div>
  );
}

export default Banner;
