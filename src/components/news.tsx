import { NextPage } from 'next'
import { NEWS, NEWSLIST } from '../types/news'
import Link from 'next/link'
import { changeFormatDate } from '../types/date'

const News: NextPage<NEWS> = ({ title, date, categories, postId }) => {
  if (!categories) return <div></div>
  return (
    <>
      <li style={{ marginBottom: 20 }}>
        <Link href={`/news/${postId}`}>
          <a>
            <p>
              {changeFormatDate(date, 'YYYY.MM.DD')}
            </p>
            <p>
              {categories.nodes[0].name}
            </p>
            <h4>
              <span>{title}</span>
            </h4>
            <span></span>
          </a>
        </Link>
      </li>
    </>
  )
}

export default News
