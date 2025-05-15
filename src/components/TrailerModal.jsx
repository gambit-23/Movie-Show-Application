import PropTypes from "prop-types";

function TrailerModal({ trailerKey, closeModal }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 transition-opacity duration-300 ease-in-out">
      <div className="relative w-[90vw] sm:w-[80vw] lg:w-[60vw] aspect-video bg-black rounded-xl overflow-hidden shadow-lg">
        {/* Trailer Video */}
        <iframe
          className="w-full h-full rounded-xl"
          src={`https://www.youtube.com/embed/${trailerKey}`}
          title="Trailer"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>

        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white rounded-full p-3 text-xl shadow-lg focus:outline-none transition-all duration-200 ease-in-out"
        >
          ✖
        </button>
      </div>
    </div>
  );
}

TrailerModal.propTypes = {
  trailerKey: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default TrailerModal;
