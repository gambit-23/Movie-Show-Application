import React from "react";

const Pagination = ({ handlePrev, handleNext, page }) => {
  return (
    <div className="bg-blue-700 p-4 mt-8 flex justify-center w-80 items-center rounded-xl shadow-2xl">
  {/* Previous Button */}
  <div
    onClick={handlePrev}
    className="px-6 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-500 transition-all duration-300 cursor-pointer"
  >
    <i className="fa-solid fa-arrow-left text-xl"></i>
  </div>

  {/* Page Number */}
  <div className="font-semibold text-white mx-4 text-xl ">
    Page {page}
  </div>

  {/* Next Button */}
  <div
    onClick={handleNext}
    className="px-6 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-500 transition-all duration-300 cursor-pointer"
  >
    <i className="fa-solid fa-arrow-right text-xl"></i>
  </div>
</div>
  );
};

export default Pagination;
