const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL as string;
export const PERPAGE = 12; // 一覧ページに表示する投稿数

type VARIABLES = {
  variables?: Object;
};

export const fetchAPI = async (query: string, { variables }: VARIABLES = {}) => {
  const headers = { "Content-Type": "application/json" };

  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers["Authorization"] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`;
  }

  const res = await fetch(API_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }
  return json.data;
};
