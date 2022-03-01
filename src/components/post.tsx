import { POST } from "../types/post";
import Link from "next/link";
import { changeFormatDate } from "../libs/date";

const Post: React.VFC<POST> = ({
  title,
  date,
  featuredImage,
  categories,
  postId,
}) => {
  return (
    <>
      <li className="block">
        <Link href={`/posts/${postId}`}>
          <a>
            <img
              src={featuredImage?.node.sourceUrl ?? "/img/no_image.png"}
              width="300"
              height="200"
            />
            <span className="font-bold mx-1">{title}</span>
            <span className="text-xs text-red-400 mx-1">
              {changeFormatDate(date, "YYYY.MM.DD")}
            </span>
            <span className="text-xs text-gray-500 mx-1">
              {categories.nodes[0]?.name}
            </span>
          </a>
        </Link>
      </li>
    </>
  );
};

export default Post;
