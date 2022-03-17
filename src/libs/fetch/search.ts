import { POSTLIST, TOTALPAGES } from "types/post";
import { fetchAPI, PERPAGE } from "libs/fetch/common";

//ページ番号に対応するpostを取得する。
export const getSearchPosts = async (
  page: number = 1,
  search: string | string[] = ""
): Promise<POSTLIST> => {
  const data = await fetchAPI(
    `
      query Posts($search: String, $offset: Int, $size: Int) {
        posts(
          where: {
            search: $search,
            offsetPagination: {offset: $offset, size: $size}
          }
          ){
          pageInfo {
            offsetPagination {
              hasPrevious
              hasMore
              total
            }
          }
          edges {
            node {
              postId
              slug
              title
              date
              featuredImage {
                node {
                  sourceUrl
                }
              }
              categories {
                nodes {
                  name
                }
              }
            }
          }
        }
      }
      `,
    {
      variables: {
        offset: (page - 1) * PERPAGE,
        size: PERPAGE,
        search: search,
      },
    }
  );
  return data.posts;
};

//ページ数を取得
export const getSearchTotalPages = async (search: string | string[] = ""): Promise<TOTALPAGES> => {
  const data = await fetchAPI(
    `
        query TotalPages($search: String){
          posts (
            where: {search: $search}
          ) {
            pageInfo {
              offsetPagination {
                total
              }
            }
          }
        }
      `,
    {
      variables: {
        search: search,
      },
    }
  );
  const totalPages = Math.ceil(data.posts.pageInfo.offsetPagination.total / PERPAGE);
  return { totalPages: totalPages };
};
