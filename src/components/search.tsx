import { useState } from "react";
import { useRouter } from "next/router";

type PROPS = {
  className?: string;
};

const Search: React.VFC<PROPS> = ({ className }) => {
  const [query, setQuery] = useState<string>(null);
  const router = useRouter();

  const searchPosts = (e) => {
    e.preventDefault();
    router.push({
      pathname: "/search",
      query: { s: query },
    });
  };

  return (
    <form className={className} onSubmit={searchPosts}>
      <input
        value={query}
        placeholder="検索キーワード"
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        className="p-2 border"
      />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white">
        検索
      </button>
    </form>
  );
};

export default Search;
