import { GetStaticProps, NextPage } from 'next'
import useSWR from 'swr'
import { getNewsListData } from '../../api/fetch'
import { NEWS, NEWSLIST } from '../../types/news'
import News from '../../components/news'

const fetcher = async () => {
  const result = await getNewsListData()
  return result.data.posts
}

const Index: NextPage<NEWSLIST> = ({ staticNews }) => {
  const { data: posts, error } = useSWR('news_key', fetcher, {
    fallbackData: staticNews,
  })

  if (error) return <div>Failed to Load</div>
  if (!posts) return <div>Loading....</div>
  return (
    <>
      <main role="main">
        <div>
          <ul>
            {posts.nodes &&
              posts.nodes.map((news: NEWS) => (
                <News key={news.id} {...news} />
              ))}
          </ul>
        </div>
      </main>
    </>
  )
}
export default Index

export const getStaticProps: GetStaticProps = async () => {
  const json = await getNewsListData()
  return {
    props: {
      staticNews: json.data.posts,
    },
    revalidate: 10,
  }
}
