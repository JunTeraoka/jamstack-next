import { GetStaticProps, NextPage } from "next";
import { getPagePostsData } from "api/post";
import { POSTLIST } from "types/post";
import Post from "components/post";
import Pagination from "components/pagination";
import { useEffect } from "react";

const Index: NextPage<POSTLIST> = (staticPosts) => {
  const posts = staticPosts;
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
          currentPage={1}
          hasPrevious={posts.pageInfo.offsetPagination.hasPrevious}
          hasMore={posts.pageInfo.offsetPagination.hasMore}
        />
      </div>
    </>
  );
};
export default Index;

export const getStaticProps: GetStaticProps = async () => {
  const json = await getPagePostsData();
  return {
    props: json.data.posts,
    revalidate: 10,
  };
};
