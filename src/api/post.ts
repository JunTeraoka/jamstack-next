import { POSTPATHS } from "types/post";
import { api_url } from "api/common";

type QUERYPARAMS = {
  first?: number;
  search?: string | string[];
};

//ページ番号に対応するnewsを取得する。
export const getPagePostsData = async (
  params: QUERYPARAMS = { first: 1000 }
) => {
  const response = await fetch(api_url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
      query PostsQuery{
        posts(
          first: ${params.first ?? 1000},
          where: {search: "${params.search ?? ""}"}
          ){
          pageInfo {
            endCursor
            hasNextPage
            hasPreviousPage
            startCursor
          }
          edges {
            cursor
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
