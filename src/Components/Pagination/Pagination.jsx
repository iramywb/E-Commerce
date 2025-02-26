import PropTypes from 'prop-types';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const getMiddleRange = () => {
    let start = currentPage - 2;
    let end = currentPage + 2;

    if (currentPage <= 3) {
      start = 1;
      end = Math.min(5, totalPages);
    } else if (currentPage >= totalPages - 2) {
      start = Math.max(totalPages - 4, 1);
      end = totalPages;
    }

    start = Math.max(start, 1);
    end = Math.min(end, totalPages);

    return { start, end };
  };

  const { start, end } = getMiddleRange();
  const middlePages = Array.from({ length: end - start + 1 }, (_, i) => start + i);
  
  const showStartEllipsis = start > 2;
  const showEndEllipsis = end < totalPages - 1;

  return (
    <div className="flex items-center justify-center gap-1 mt-4 select-none">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded-md text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Previous page"
      >
        Previous
      </button>

      {/* First Page */}
      {start > 1 && (
        <button
          onClick={() => onPageChange(1)}
          className={`px-3 py-1 rounded-md ${
            currentPage === 1
              ? "bg-gray-800 text-white cursor-default"
              : "text-gray-600 hover:bg-gray-100"
          }`}
          disabled={currentPage === 1}
        >
          1
        </button>
      )}

      {/* Start Ellipsis */}
      {showStartEllipsis && <span className="px-3 py-1 text-gray-600">...</span>}

      {/* Middle Pages */}
      {middlePages.map((page) => (
        <button
          key={page}
          onClick={page !== currentPage ? () => onPageChange(page) : undefined}
          className={`px-3 py-1 rounded-md ${
            page === currentPage
              ? "bg-gray-800 text-white cursor-default"
              : "text-gray-600 hover:bg-gray-100"
          }`}
          disabled={page === currentPage}
        >
          {page}
        </button>
      ))}

      {/* End Ellipsis */}
      {showEndEllipsis && <span className="px-3 py-1 text-gray-600">...</span>}

      {/* Last Page */}
      {end < totalPages && (
        <button
          onClick={() => onPageChange(totalPages)}
          className={`px-3 py-1 rounded-md ${
            currentPage === totalPages
              ? "bg-gray-800 text-white cursor-default"
              : "text-gray-600 hover:bg-gray-100"
          }`}
          disabled={currentPage === totalPages}
        >
          {totalPages}
        </button>
      )}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded-md text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Next page"
      >
        Next
      </button>
    </div>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};