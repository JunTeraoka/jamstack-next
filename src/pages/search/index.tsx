import { useRouter } from "next/router";
import { getSearchPosts } from "libs/fetch/search";
import { useEffect, useState } from "react";
import { POSTLIST } from "types/post";
import Post from "components/post";
import Pagination from "components/pagination";

export default function Page() {
  const [posts, setPosts] = useState<POSTLIST>();
  const router = useRouter();
  const query = router.query;

  useEffect(() => {
    if (Object.keys(query).length > 0) {
      (async () => {
        const searchedPosts = await getSearchPosts(Number(query.p), query.s);
        setPosts(searchedPosts);
      })();
    }
  }, [query]);

  if (!posts) return <div>Loading....</div>;

  return (
    <>
      <ul className="grid grid-cols-3 gap-4">
        {posts.edges && posts.edges.map((post) => <Post key={post.node.postId} {...post.node} />)}
      </ul>
    </>
  );
}
