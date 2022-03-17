import Link from "next/link";

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
            <Link key="page-first" href={`${baseUrl}1`} prefetch={false}>
              <a className="px-2 py-2 border">{"<<"}</a>
            </Link>
            <Link key="page-previous" href={`${baseUrl}${currentPage - 1}`} prefetch={false}>
              <a className="px-2 py-2 border">{"<"}</a>
            </Link>
          </>
        )}
        {[...Array(Math.min(totalPages, 7))].map((_, index) => {
          const pageIndex = firstPage + index;
          if (totalPages < pageIndex) {
            return <></>;
          }
          return (
            <Link key={`page-${pageIndex}`} href={`${baseUrl}${pageIndex}`} prefetch={false}>
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
            <Link key="page-next" href={`${baseUrl}${currentPage + 1}`} prefetch={false}>
              <a className="px-2 py-2 border">{">"}</a>
            </Link>
            <Link key="page-last" href={`${baseUrl}${totalPages}`} prefetch={false}>
              <a className="px-2 py-2 border">{">>"}</a>
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Pagination;
