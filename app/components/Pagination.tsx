interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const getPageNumbers = () => {
    const pages: { number: number; isActive?: boolean }[] = [];
    const maxVisiblePages = {
      mobile: 3,
      desktop: 5,
    };

    const addPageNumber = (pageNum: number, isActive: boolean = false) => ({
      number: pageNum,
      isActive,
    });

    if (totalPages <= maxVisiblePages.desktop) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(addPageNumber(i, i === currentPage));
      }
    } else {
      pages.push(addPageNumber(1, currentPage === 1));

      let startPage: number;
      let endPage: number;

      if (currentPage <= 3) {
        startPage = 2;
        endPage = 4;
      } else if (currentPage >= totalPages - 2) {
        startPage = totalPages - 3;
        endPage = totalPages - 1;
      } else {
        startPage = currentPage - 1;
        endPage = currentPage + 1;
      }

      if (startPage > 2) {
        pages.push({ number: -1 });
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(addPageNumber(i, i === currentPage));
      }

      if (endPage < totalPages - 1) {
        pages.push({ number: -1 });
      }

      pages.push(addPageNumber(totalPages, currentPage === totalPages));
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <nav
      className="flex flex-col items-center space-y-4 mt-8"
      aria-label="Pagination"
    >
      <div className="flex items-center justify-between w-full md:hidden">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md 
                     text-gray-700 bg-white border border-gray-300 hover:bg-gray-50
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="text-sm text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md
                     text-gray-700 bg-white border border-gray-300 hover:bg-gray-50
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>

      <div className="hidden md:flex md:items-center md:space-x-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="relative inline-flex items-center px-3 py-2 text-sm font-medium rounded-md
                     text-gray-700 bg-white border border-gray-300 hover:bg-gray-50
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="hidden sm:block ml-1">Previous</span>
        </button>

        <div className="flex items-center space-x-2">
          {pages.map((page, index) =>
            page.number === -1 ? (
              <span
                key={`ellipsis-${index}`}
                className="px-3 py-2 text-gray-500"
              >
                ...
              </span>
            ) : (
              <button
                key={page.number}
                onClick={() => onPageChange(page.number)}
                className={`relative inline-flex items-center px-3 py-2 text-sm font-medium rounded-md
                           ${
                             page.isActive
                               ? "z-10 bg-blue-600 text-white"
                               : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                           }`}
                aria-current={page.isActive ? "page" : undefined}
              >
                {page.number}
              </button>
            )
          )}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="relative inline-flex items-center px-3 py-2 text-sm font-medium rounded-md
                     text-gray-700 bg-white border border-gray-300 hover:bg-gray-50
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="hidden sm:block mr-1">Next</span>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <div className="hidden sm:flex sm:items-center sm:justify-center">
        <p className="text-sm text-gray-700">
          Showing page <span className="font-medium">{currentPage}</span> of{" "}
          <span className="font-medium">{totalPages}</span>
        </p>
      </div>
    </nav>
  );
}
