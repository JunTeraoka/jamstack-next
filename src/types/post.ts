export type POST = {
  id: string;
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
  staticPostDetail: {
    id: string;
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
    content: string;
  };
  staticPaths: {
    postId: number;
  }[];
};

//post詳細パス取得用
export type POSTPATHS = {
  data: {
    posts: {
      nodes: [
        {
          slug: string;
          postId: number;
        }
      ];
    };
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
