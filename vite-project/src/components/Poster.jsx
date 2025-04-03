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
      className="h-[20vh] md:h-[75vh] bg-cover bg-center flex items-end"
      style={{
        backgroundImage: `url('${
          bannerMovie?.backdrop_path
            ? `https://image.tmdb.org/t/p/original/${bannerMovie?.backdrop_path}`
            : ""
        })`,
      }}
    >
      <div className="text-white text-xl text-center w-full bg-gray-900/60 p-2">
        {bannerMovie?.title || bannerMovie?.name || bannerMovie?.original_name}
      </div>
    </div>
  );
}

export default Banner;
