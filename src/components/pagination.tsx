import { getPostPagePaths } from "api/post";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  baseUrl: string;
  totalPages: number;
  currentPage: number;
  hasPrevious: boolean;
  hasMore: boolean;
};

const Pagination: React.VFC<Props> = ({
  baseUrl,
  totalPages,
  currentPage,
  hasPrevious,
  hasMore,
}) => {
  const firstPage = Math.max(currentPage - 3, 1);
  return (
    <>
      <div className="my-5">
        {hasPrevious && (
          <>
            <Link key="page-first" href={`${baseUrl}1`}>
              <a className="px-2 py-2 border">{"<<"}</a>
            </Link>
            <Link key="page-previous" href={`${baseUrl}${currentPage - 1}`}>
              <a className="px-2 py-2 border">{"<"}</a>
            </Link>
          </>
        )}
        {[...Array(Math.min(totalPages, 7))].map((_, index) => {
          const pageIndex = firstPage + index;
          return (
            <Link key={`page-${pageIndex}`} href={`${baseUrl}${pageIndex}`}>
              <a
                className={`px-2 py-2 border ${
                  pageIndex == currentPage ? "bg-gray-700 text-white" : ""
                }`}
              >
                {pageIndex}
              </a>
            </Link>
          );
        })}
        {hasMore && (
          <>
            <Link key="page-next" href={`${baseUrl}${currentPage + 1}`}>
              <a className="px-2 py-2 border">{">"}</a>
            </Link>
            <Link key="page-last" href={`${baseUrl}${totalPages}`}>
              <a className="px-2 py-2 border">{">>"}</a>
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Pagination;
