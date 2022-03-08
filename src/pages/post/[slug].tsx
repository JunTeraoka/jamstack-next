import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { getPostDetailPaths, getPostDetail } from "libs/fetch/post";
import { POSTDETAIL } from "types/post";
import { useRouter } from "next/router";

const PostDetail: NextPage<POSTDETAIL> = (post) => {
  const router = useRouter();
  const { isFallback } = router;
  // if (isFallback) return <div>Loading....</div>;
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
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // const postId = preview ? previewData.post.id : (params.postId as string);
  const postSlug = params.slug as string;
  const postDetail = await getPostDetail(postSlug);
  return {
    props: postDetail,
    revalidate: 10,
  };
};
export default PostDetail;
