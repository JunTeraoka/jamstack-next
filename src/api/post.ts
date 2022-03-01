import { POSTPATHS, TOTALPOSTS } from "types/post";
import { api_url } from "api/common";

const PERPAGE = 12;

//ページ番号に対応するpostを取得する。
export const getPagePostsData = async (
  page: number = 1,
  search: string | string[] = ""
) => {
  const response = await fetch(api_url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
      query PostsQuery{
        posts(
          where: {
            offsetPagination: {offset: ${
              (page - 1) * PERPAGE
            }, size: ${PERPAGE}},
            search: "${search}"
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
    }),
  });
  const json = await response.json();
  return json;
};

//一覧ページのpathを取得
export const getPostPagePaths = async () => {
  const response = await fetch(api_url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        query PostPagePaths{
          posts {
            pageInfo {
              offsetPagination {
                total
              }
            }
          }
        }
      `,
    }),
  });
  const json: TOTALPOSTS = await response.json();
  const totalPages = Math.ceil(
    json.data.posts.pageInfo.offsetPagination.total / PERPAGE
  );
  return [...Array(totalPages)].map((_, index) => {
    return {
      params: {
        page: `${index + 1}`,
      },
    };
  });
};

//post詳細のpathを取得
export const getPostDetailPaths = async () => {
  const response = await fetch(api_url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        query PostPaths{
          posts {
            nodes {
              postId
            }
          }
        }
      `,
    }),
  });
  const json: POSTPATHS = await response.json();
  const posts = json.data.posts.nodes;
  return posts.map((post) => {
    return {
      params: {
        postId: `${post.postId}`,
      },
    };
  });
};

//postの詳細取得
export const getPostDetailData = async (postId: number) => {
  const response = await fetch(api_url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
      query NewsDetailQuery($postId: Int = ${postId}){
        postBy(postId: $postId) {
          postId
          title
          date
          content
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
    `,
    }),
  });
  const json = await response.json();
  return json;
};
