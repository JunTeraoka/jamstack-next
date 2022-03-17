import { POST } from "../types/post";
import Link from "next/link";
import { changeFormatDate } from "../libs/date";

const Post: React.VFC<POST> = ({ title, date, featuredImage, categories, slug }) => {
  return (
    <>
      <li className="block">
        <Link href={`/post/${slug}`} prefetch={false}>
          <a>
            <img
              src={featuredImage?.node.sourceUrl ?? "/img/no_image.png"}
              width="300"
              height="200"
            />
            <span className="mx-1 font-bold">{title}</span>
            <span className="mx-1 text-xs text-red-400">
              {changeFormatDate(date, "YYYY.MM.DD")}
            </span>
            <span className="mx-1 text-xs text-gray-500">{categories.nodes[0]?.name}</span>
          </a>
        </Link>
      </li>
    </>
  );
};

export default Post;
