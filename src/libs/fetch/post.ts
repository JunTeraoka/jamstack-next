import {
  PAGEPATH,
  POSTDETAIL,
  POSTLIST,
  POSTPATH,
  TOTALPAGES,
} from "types/post";
import { fetchAPI } from "libs/fetch/common";

const PERPAGE = 12;

//ページ番号に対応するpostを取得する。
export const getPagePostsData = async (
  page: number = 1,
  search: string | string[] = ""
): Promise<POSTLIST> => {
  const data = await fetchAPI(
    `
      query PostsQuery($search: String, $offset: Int, $size: Int) {
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
export const getTotalPages = async (
  search: string | string[] = ""
): Promise<TOTALPAGES> => {
  const data = await fetchAPI(
    `
        query PostPagePaths($search: String){
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
  const totalPages = Math.ceil(
    data.posts.pageInfo.offsetPagination.total / PERPAGE
  );
  return { totalPages: totalPages };
};

//一覧ページのpathを取得
export const getPostPagePaths = async (): Promise<PAGEPATH[]> => {
  const totalPages = await getTotalPages();
  return [...Array(totalPages.totalPages)].map((_, index) => {
    return {
      params: {
        page: `${index + 1}`,
      },
    };
  });
};

//post詳細のpathを取得
export const getPostDetailPaths = async (): Promise<POSTPATH[]> => {
  const data = await fetchAPI(`
        query PostPaths{
          posts (first: ${PERPAGE * 2}) {
            nodes {
              postId
            }
          }
        }
      `);
  const posts = data.posts.nodes;
  return posts.map((post) => {
    return {
      params: {
        postId: `${post.postId}`,
      },
    };
  });
};

//postの詳細取得
export const getPostDetailData = async (
  postId: number
): Promise<POSTDETAIL> => {
  const data = await fetchAPI(
    `
      query NewsDetailQuery($postId: Int){
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
    { variables: { postId: postId } }
  );
  return data.postBy;
};

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
