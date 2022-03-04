import { NextApiHandler } from "next";
import { getPreviewPost } from "libs/fetch/post";

const preview: NextApiHandler = async (req, res) => {
  const { secret, id, slug } = req.query;

  // トークンの照合
  //   if (
  //     !process.env.WORDPRESS_PREVIEW_SECRET ||
  //     secret !== process.env.WORDPRESS_PREVIEW_SECRET ||
  //     (!id && !slug)
  //   ) {
  //     return res.status(401).json({ message: "Invalid token" });
  //   }

  // idまたはslugで投稿データを取得
  const post = await getPreviewPost(Number(id), "DATABASE_ID");
  console.log(post);

  if (!post) {
    return res.status(401).json({ message: "Post not found" });
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({
    post: {
      id: post.databaseId,
      status: post.status,
    },
  });

  // Redirect to the path from the fetched post
  // We don't redirect to `req.query.slug` as that might lead to open redirect vulnerabilities
  res.writeHead(307, { Location: `/posts/${post.databaseId}` });
  res.end();
};

export default preview;
// http://localhost:3000/api/preview?secret=123&id=36749
