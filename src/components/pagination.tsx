import { getPostPagePaths } from "api/post";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  currentPage: number;
  hasPrevious: boolean;
  hasMore: boolean;
};

const Pagination: React.VFC<Props> = ({
  currentPage,
  hasPrevious,
  hasMore,
}) => {
  const [totalpage, setTotalPage] = useState<number>(1);
  const firstPage = Math.max(currentPage - 3, 1);
  useEffect(() => {
    (async () => {
      const paths = await getPostPagePaths();
      setTotalPage(Number(paths[paths.length - 1].params.page));
    })();
  }, []);

  return (
    <>
      <div>
        {hasPrevious && (
          <>
            <Link key="page-first" href="/page/1">
              <a className="px-2 py-2 border">{"<<"}</a>
            </Link>
            <Link key="page-previous" href={`/page/${currentPage - 1}`}>
              <a className="px-2 py-2 border">{"<"}</a>
            </Link>
          </>
        )}
        {[...Array(Math.min(totalpage, 7))].map((_, index) => {
          return (
            <Link key={`page-${firstPage + index}`} href={`/page/${index + 1}`}>
              <a
                className={`px-2 py-2 border ${
                  index + 1 == currentPage ? "bg-gray-700 text-white" : ""
                }`}
              >
                {index + 1}
              </a>
            </Link>
          );
        })}
        {hasMore && (
          <>
            <Link key="page-next" href={`/page/${currentPage + 1}`}>
              <a className="px-2 py-2 border">{">"}</a>
            </Link>
            <Link key="page-last" href={`/page/${totalpage}`}>
              <a className="px-2 py-2 border">{">>"}</a>
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Pagination;
