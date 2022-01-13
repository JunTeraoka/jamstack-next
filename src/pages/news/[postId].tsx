import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import useSWR from 'swr'
import {
  getNewsDetailPaths,
  getNewsDetailData,
  getNewsPaths,
} from '../../api/fetch'
import { NEWSDETAIL } from '../../types/news'
import { useRouter } from 'next/router'

const NewsDetail: NextPage<NEWSDETAIL> = ({
  staticNewsDetail,
  staticPaths,
}) => {
  const router = useRouter()
  const id = router.query
  const path = router.asPath
  const fetcher = async () => {
    const result = await getNewsDetailData(Number(id.postId))
    return result.data.postBy
  }
  const { data: news, error } = useSWR(path, fetcher, {
    fallbackData: staticNewsDetail,
  })
  if (error) return <div>Loading....</div>
  if (!news) return <div>Loading....</div>

  return (
    <>
      <main role="main">
        <p>
          {news.categories ? news.categories.nodes[0].name : ''}
        </p>
        <h2>
          {news.title}
        </h2>
        <article
          dangerouslySetInnerHTML={{ __html: news.content }}
        ></article>
      </main>
    </>
  )
}
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getNewsDetailPaths()
  return {
    paths,
    fallback: true,
  }
}
export const getStaticProps: GetStaticProps = async (context) => {
  let postId = context.params!.postId as string
  const json = await getNewsDetailData(Number(postId))
  const paths = await getNewsPaths()
  return {
    props: {
      staticNewsDetail: json.data.postBy,
      staticPaths: paths,
    },
    revalidate: 10,
  }
}
export default NewsDetail
