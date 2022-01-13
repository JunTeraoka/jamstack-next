export type NEWSLIST = {
  staticNews: {
    nodes: [
      {
        id: string
        postId: number
        title: string
        date: string
        uri: string
        categories: {
          nodes: [
            {
              name: string
            }
          ]
        }
      }
    ]
  }
}

export type NEWS = {
  id: string
  postId: number
  title: string
  date: string
  uri: string
  categories: {
    nodes: [
      {
        name: string
      }
    ]
  }
}
//news詳細データ取得用
export type NEWSDETAIL = {
  staticNewsDetail: {
    id: string
    title: string
    date: string
    content: string
    postId: number
    categories: {
      nodes: [
        {
          name: string
        }
      ]
    }
  }
  staticPaths: {
    postId: number
  }[]
}
//news詳細パス取得用
export type NEWSPATHS = {
  data: {
    posts: {
      nodes: [
        {
          postId: number
        }
      ]
    }
  }
}

export type NEWSANDPATHS = {
  data: {
    posts: {
      nodes: [
        {
          id: string
          postId: number
          title: string
          date: string
          categories: {
            nodes: [
              {
                name: string
              }
            ]
          }
        }
      ]
    }
  }
  pagenation: PARAMS[]
}

export type PARAMS = {
  lastId: string
  number: string
}
