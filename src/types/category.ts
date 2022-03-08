//カテゴリデータ取得用
export type CATEGORY = {
  nodes: {
    name: string;
    slug: string;
  };
};

//post詳細パス取得用
export type CATEGORYPATH = {
  params: {
    slug: string;
  };
};
