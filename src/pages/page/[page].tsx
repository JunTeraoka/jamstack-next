import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { getPostPagePaths } from "../../api/post";
import { POSTLIST } from "../../types/post";
import { useRouter } from "next/router";
import { getPagePostsData } from "api/post";
import Post from "components/post";
import Pagination from "components/pagination";

const PostsPage: NextPage<POSTLIST> = (posts) => {
  const router = useRouter();
  if (!posts) return <div>Loading....</div>;
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
  const paths = allPaths.slice(0, Math.min(5, allPaths.length));
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const page = Number(context.params!.page as string);
  const json = await getPagePostsData(page);
  return {
    props: json.data.posts,
    revalidate: 10,
  };
};

export default PostsPage;
