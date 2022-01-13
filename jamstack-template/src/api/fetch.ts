//GraphQLのAPIはこちらに記述お願いします。

import { NEWSPATHS } from '../types/news'
import { api_url } from '../types/url'

//worksの全てのデータ取得
export const getAllWorksData = async () => {
  const response = await fetch(
    api_url, // process.env.[envファイルに追加した環境変数参照]
    {
      //今回は基本POST(取得)しか使わないはずなのでおまじないだと思っていただければOK
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        //WPGraphQLのIDEからquery以下コピペ↓
        query: `
        query AllWorksQuery {
          works {
            nodes {
              content
              featuredImage {
                node {
                  sourceUrl
                }
              }
              title
              uri
              id
              workId
              workTags {
                nodes {
                  name
                  id
                }
              }
              worksCategories {
                nodes {
                  id
                  name
                }
              }
              workAcf {
                url
                date
                client
              }
            }
          }
        }      
      `,
      }),
    }
  )
  //取得したデータをJSON形式に変更
  const json = await response.json()
  return json
}

//ページ番号に対応するnewsを取得する。
export const getNewsListData = async () => {
  const response = await fetch(api_url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
      query AllNewsQuery{
        posts{
          nodes {
            id
            postId
            title
            date
            uri
            categories {
              nodes {
                name
              }
            }
          }
        }
      }
      `,
    }),
  })
  const json = await response.json()
  return json
}

//news詳細のpathを取得
export const getNewsDetailPaths = async () => {
    const response = await fetch(api_url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
        query NewsPaths{
          posts {
            nodes {
              postId
            }
          }
        }
      `,
      }),
    })
    const json: NEWSPATHS = await response.json()
    const posts = json.data.posts.nodes
    return posts.map((post) => {
      return {
        params: {
          postId: `${post.postId}`,
        },
      }
    })
  }

//newsの詳細取得
export const getNewsDetailData = async (postId: number) => {
  const response = await fetch(api_url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
      query NewsDetailQuery($postId: Int = ${postId}){
        postBy(postId: $postId) {
          id
          title
          date
          content
          postId
          categories {
            nodes {
              name
            }
          }
        }
      }
    `,
    }),
  })
  const json = await response.json()
  return json
}

export const getNewsPaths = async () => {
  const response = await fetch(api_url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
      query NewsPaths{
        posts {
          nodes {
            postId
          }
        }
      }
    `,
    }),
  })
  const json: NEWSPATHS = await response.json()
  const posts = json.data.posts.nodes
  return posts.map((post) => {
    return {
      postId: post.postId,
    }
  })
}

