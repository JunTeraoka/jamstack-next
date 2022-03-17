import { PAGEPATH, POSTDETAIL, POSTLIST, POSTPATH, TOTALPAGES } from "types/post";
import { fetchAPI, PERPAGE } from "libs/fetch/common";

//ページ番号に対応するpostを取得する。
export const getPosts = async (page: number = 1): Promise<POSTLIST> => {
  const data = await fetchAPI(
    `
      query Posts($offset: Int, $size: Int) {
        posts(
          where: {
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
      },
    }
  );
  return data.posts;
};

//ページ数を取得
export const getTotalPages = async (): Promise<TOTALPAGES> => {
  const data = await fetchAPI(
    `
        query TotalPages{
          posts{
            pageInfo {
              offsetPagination {
                total
              }
            }
          }
        }
      `
  );
  const totalPages = Math.ceil(data.posts.pageInfo.offsetPagination.total / PERPAGE);
  return { totalPages: totalPages };
};

//一覧ページのpathを取得
export const getPostPagePaths = async (totalPages: number): Promise<PAGEPATH[]> => {
  return [...Array(totalPages)].map((_, index) => {
    return {
      params: {
        page: `${index + 1}`,
      },
    };
  });
};

//postの詳細取得
export const getPostDetail = async (postSlug: string): Promise<POSTDETAIL> => {
  const data = await fetchAPI(
    `
      query PostDetail($postSlug: String){
        postBy(slug: $postSlug) {
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
    { variables: { postSlug: postSlug } }
  );
  return data.postBy;
};

//post詳細のpathを取得
export const getPostDetailPaths = async (): Promise<POSTPATH[]> => {
  const data = await fetchAPI(`
        query PostPaths{
          posts (first: ${PERPAGE * 2}) {
            nodes {
              slug
            }
          }
        }
      `);
  const posts = data.posts.nodes;
  return posts.map((post) => {
    return {
      params: {
        slug: `${post.slug}`,
      },
    };
  });
};

// プレビューデータ取得
export async function getPreviewPost(id: number, idType = "DATABASE_ID") {
  const data = await fetchAPI(
    `
    query PreviewPost($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        databaseId
        slug
        status
      }
    }`,
    {
      variables: { id, idType },
    }
  );
  return data.post;
}
