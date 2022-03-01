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
    endCursor: string;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string;
  };
  edges: [
    {
      cursor: string;
      node: POST;
    }
  ];
};

//news詳細データ取得用
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
//news詳細パス取得用
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

export type NEWSANDPATHS = {
  data: {
    posts: {
      nodes: [
        {
          id: string;
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
        }
      ];
    };
  };
  pagenation: PARAMS[];
};

export type PARAMS = {
  lastId: string;
  number: string;
};
