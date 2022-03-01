import { useRouter } from "next/router";
import { getPagePostsData } from "api/post";
import { useEffect, useState } from "react";
import { POSTLIST } from "types/post";
import Post from "components/post";

export default function Page() {
  const [posts, setPosts] = useState<POSTLIST>();
  const router = useRouter();
  const query = router.query;
  console.log(query);

  const searchPosts = async () => {
    const json = await getPagePostsData({ search: query.s });
    return json.data.posts;
  };

  useEffect(() => {
    if (Object.keys(query).length > 0) {
      (async () => {
        const searchedPosts = await searchPosts();
        setPosts(searchedPosts);
      })();
    }
  }, [query]);

  if (!posts) return <div>Loading....</div>;

  return (
    <>
      <ul className="grid grid-cols-3 gap-4">
        {posts.edges &&
          posts.edges.map((post) => (
            <Post key={post.node.postId} {...post.node} />
          ))}
      </ul>
    </>
  );
}
