import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import {
  getCategoryPaths,
  getCategoryPosts,
  getCategoryTotalPages,
} from "libs/fetch/category";
import { POSTLIST, TOTALPAGES } from "../../types/post";
import { useRouter } from "next/router";
import Post from "components/post";
import Pagination from "components/pagination";

type Props = {
  posts: POSTLIST;
  totalPages: TOTALPAGES;
};

const PostsPage: NextPage<Props> = ({ posts, totalPages }) => {
  const router = useRouter();
  const { isFallback } = router;
  if (isFallback) return <div>Loading....</div>;
  return (
    <>
      <div>
        <ul className="grid grid-cols-3 gap-4">
          {posts.edges &&
            posts.edges.map((post) => (
              <Post key={post.node.postId} {...post.node} />
            ))}
        </ul>
        <Pagination
          baseUrl="/page/"
          totalPages={totalPages.totalPages}
          currentPage={Number(router.query.page)}
          hasPrevious={posts.pageInfo?.offsetPagination.hasPrevious}
          hasMore={posts.pageInfo?.offsetPagination.hasMore}
        />
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getCategoryPaths();
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params!.slug as string;
  const posts = await getCategoryPosts(1, slug);
  const totalPages = await getCategoryTotalPages(slug);
  return {
    props: { posts, totalPages },
    revalidate: 10,
  };
};

export default PostsPage;
