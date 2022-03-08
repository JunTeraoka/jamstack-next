import { POSTLIST, TOTALPAGES } from "types/post";
import { fetchAPI, PERPAGE } from "libs/fetch/common";
import { CATEGORY, CATEGORYPATH } from "types/category";

// カテゴリ一覧の取得
export const getCategories = async (): Promise<CATEGORY> => {
  const data = await fetchAPI(
    `
        query Categories{
          categories {
            nodes {
              name
              slug
            }
          }
        }
      `
  );
  const categories = data.categories.nodes;
  return categories;
};

// カテゴリへのパスを取得
export const getCategoryPaths = async (): Promise<CATEGORYPATH[]> => {
  const data = await fetchAPI(
    `
        query CategoryPaths{
          categories {
            nodes {
              slug
            }
          }
        }
      `
  );
  const categories = data.categories.nodes;
  return categories.map((category) => {
    return {
      params: {
        slug: `${category.slug}`,
      },
    };
  });
};

//ページ番号に対応するpostを取得する。
export const getCategoryPosts = async (
  page: number = 1,
  categorySlug: string
): Promise<POSTLIST> => {
  const data = await fetchAPI(
    `
      query Posts($categorySlug: String, $offset: Int, $size: Int) {
        category(id: $categorySlug, idType: SLUG) {
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
      }
      `,
    {
      variables: {
        categorySlug: categorySlug,
        offset: (page - 1) * PERPAGE,
        size: PERPAGE,
      },
    }
  );
  return data.posts;
};

//ページ数を取得
export const getCategoryTotalPages = async (
  categorySlug: string
): Promise<TOTALPAGES> => {
  const data = await fetchAPI(
    `
        query TotalPages($categorySlug: String){
          posts (
            where: {categorySlug: $categorySlug}
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
        categorySlug: categorySlug,
      },
    }
  );
  const totalPages = Math.ceil(
    data.posts.pageInfo.offsetPagination.total / PERPAGE
  );
  return { totalPages: totalPages };
};
