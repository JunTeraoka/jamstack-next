export type POST = {
  postId: number;
  title: string;
  slug: string;
  date: string;
  categories: {
    nodes: [
      {
        name: string;
      }
    ];
  };
  featuredImage: {
    node: {
      sourceUrl: string;
    };
  };
};

export type POSTLIST = {
  pageInfo: {
    offsetPagination: {
      hasMore: boolean;
      hasPrevious: boolean;
      total: number;
    };
  };
  edges: [
    {
      node: POST;
    }
  ];
};

//post詳細データ取得用
export type POSTDETAIL = {
  postId: number;
  title: string;
  date: string;
  categories: {
    nodes: [
      {
        name: string;
      }
    ];
  };
  featuredImage: {
    node: {
      sourceUrl: string;
    };
  };
  content: string;
};

//post詳細パス取得用
export type POSTPATH = {
  params: {
    slug: string;
  };
};

//ページパス取得用
export type PAGEPATH = {
  params: {
    page: string;
  };
};

//post数取得用
export type TOTALPOSTS = {
  data: {
    posts: {
      pageInfo: {
        offsetPagination: {
          total: number;
        };
      };
    };
  };
};

//ページ数取得用
export type TOTALPAGES = {
  totalPages: number;
};
