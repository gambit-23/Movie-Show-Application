import React from "react";

const Pagination = ({ handlePrev, handleNext, page }) => {
  return (
    <div className="w-full flex justify-center mt-6 sm:mt-8">
      <div className="bg-blue-700 px-4 py-3 flex items-center justify-between gap-4 sm:gap-6 rounded-xl shadow-2xl w-[90%] max-w-md">
        {/* Previous Button */}
        <button
          onClick={page > 1 ? handlePrev : null}
          disabled={page === 1}
          className={`p-2 sm:px-6 sm:py-2 rounded-full transition-all duration-300 text-lg sm:text-xl text-white ${
            page === 1
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-500"
          }`}
        >
          <i className="fa-solid fa-arrow-left" />
        </button>

        {/* Page Number */}
        <div className="font-semibold text-white text-base sm:text-xl">
          Page {page}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="p-2 sm:px-6 sm:py-2 rounded-full bg-blue-600 text-white hover:bg-blue-500 transition-all duration-300 text-lg sm:text-xl"
        >
          <i className="fa-solid fa-arrow-right" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
