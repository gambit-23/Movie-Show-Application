import PropTypes from "prop-types";
import { useState } from "react";

const Pagination = ({ handlePrev, handleNext, handlePageJump, page }) => {
  const [inputPage, setInputPage] = useState("");

  const onJump = () => {
    const pageNumber = parseInt(inputPage, 10);
    if (!isNaN(pageNumber) && pageNumber > 0) {
      handlePageJump(pageNumber);
      setInputPage("");
    }
  };

  return (
    <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-4 mt-6 sm:mt-10 px-4">
      {/* Main pagination box */}
      <div className="bg-gray-800 text-white w-full max-w-2xl rounded-xl shadow-md px-4 py-4 sm:px-6 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
        {/* Prev Button */}
        <button
          onClick={page > 1 ? () => handlePrev() : null}
          disabled={page === 1}
          className={`rounded-full px-4 py-2 sm:px-6 sm:py-2 text-sm sm:text-base transition-all duration-300 ${
            page === 1
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-yellow-400 hover:bg-yellow-500 text-black"
          }`}
        >
          <i className="fa-solid fa-arrow-left"></i>
        </button>

        {/* Page Info */}
        <div className="text-center text-sm sm:text-lg font-semibold">
          Page <span className="text-yellow-400">{page}</span>
        </div>

        {/* Next Button */}
        <button
          onClick={() => handleNext()}
          className="rounded-full px-4 py-2 sm:px-6 sm:py-2 bg-yellow-400 hover:bg-yellow-500 text-black text-sm sm:text-base transition-all duration-300"
        >
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>

      {/* Go to page input (below on mobile, inline on desktop) */}
      <div className="flex gap-2 sm:gap-3 items-center w-full sm:w-auto justify-center sm:justify-start">
        <input
          type="number"
          min={1}
          value={inputPage}
          onChange={(e) => setInputPage(e.target.value)}
          placeholder="Go to page"
          className="bg-gray-900 text-white border border-gray-700 px-4 py-2 rounded-md w-full max-w-[140px] text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <button
          onClick={onJump}
          className="bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-2 rounded-md text-sm sm:text-base transition"
        >
          Go
        </button>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  handlePrev: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  handlePageJump: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
};

export default Pagination;
