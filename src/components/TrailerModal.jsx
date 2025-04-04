import React from "react";

function TrailerModal({ trailerKey, closeModal }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
      <div className="relative w-[90vw] max-w-3xl aspect-video">
        <iframe
          className="w-full h-full rounded-xl shadow-2xl"
          src={`https://www.youtube.com/embed/${trailerKey}`}
          title="Trailer"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>

        <button
          onClick={closeModal}
          className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-2 text-lg shadow-md"
        >
          ✖
        </button>
      </div>
    </div>
  );
}

export default TrailerModal;
