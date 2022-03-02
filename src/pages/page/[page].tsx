import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { getPostPagePaths, getTotalPages } from "../../api/post";
import { POSTLIST, TOTALPAGES } from "../../types/post";
import { useRouter } from "next/router";
import { getPagePostsData } from "api/post";
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
  const allPaths = await getPostPagePaths();
  const paths = allPaths.slice(0, Math.min(10, allPaths.length));
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const page = Number(context.params!.page as string);
  const json = await getPagePostsData(page);
  const posts = json.data.posts;
  const totalPages = await getTotalPages();
  return {
    props: { posts, totalPages },
    revalidate: 10,
  };
};

export default PostsPage;
