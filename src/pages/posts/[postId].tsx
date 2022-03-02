import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import useSWR from "swr";
import { getPostDetailPaths, getPostDetailData } from "libs/post";
import { POSTDETAIL } from "types/post";
import { useRouter } from "next/router";

const PostDetail: NextPage<POSTDETAIL> = ({ staticPostDetail }) => {
  const router = useRouter();
  const { isFallback } = router;
  const id = router.query;
  const path = router.asPath;
  const fetcher = async () => {
    const result = await getPostDetailData(Number(id.postId));
    return result.data.postBy;
  };
  const { data: post, error } = useSWR(path, fetcher, {
    fallbackData: staticPostDetail,
  });

  if (isFallback) return <div>Loading....</div>;
  return (
    <>
      <article>
        <header>
          <img
            src={post.featuredImage?.node.sourceUrl ?? "/img/no_image.png"}
            width="800"
            height="400"
          />
          <h1 className="font-bold text-4xl my-8">{post.title}</h1>
        </header>
        <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
        <p>{post.categories ? post.categories.nodes[0]?.name : ""}</p>
      </article>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getPostDetailPaths();
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const postId = context.params!.postId as string;
  const json = await getPostDetailData(Number(postId));
  return {
    props: {
      staticPostDetail: json.data.postBy,
    },
    revalidate: 10,
  };
};
export default PostDetail;
