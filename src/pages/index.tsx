import { GetStaticProps, NextPage } from "next";
import { getPagePostsData } from "api/post";
import { POSTLIST } from "types/post";
import Post from "components/post";

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
      </div>
    </>
  );
};
export default Index;

export const getStaticProps: GetStaticProps = async () => {
  const json = await getPagePostsData();
  console.log(json.data);
  return {
    props: json.data.posts,
    revalidate: 10,
  };
};
