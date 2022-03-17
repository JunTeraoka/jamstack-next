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
      query: { s: query, p: 1 },
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
        className="border p-2"
      />
      <button type="submit" className="bg-blue-500 px-4 py-2 text-white">
        検索
      </button>
    </form>
  );
};

export default Search;
