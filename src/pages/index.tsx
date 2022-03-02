import { GetStaticProps, NextPage } from "next";
import { getPagePostsData, getTotalPages } from "api/post";
import { POSTLIST, TOTALPAGES } from "types/post";
import Post from "components/post";
import Pagination from "components/pagination";

type Props = {
  posts: POSTLIST;
  totalPages: TOTALPAGES;
};

const Index: NextPage<Props> = ({ posts, totalPages }) => {
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
  const posts = json.data.posts;
  const totalPages = await getTotalPages();
  return {
    props: { posts, totalPages },
    revalidate: 10,
  };
};
