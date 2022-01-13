import { useRouter } from 'next/router'
import Image from 'next/image'

export default function Home() {
  const router = useRouter()
  return (
    <div>
      <h1>Hello World!</h1>
      <button onClick={() => router.push('/news')}>news</button>
    </div>
  )
}
//htmlはまだいれてません
//SWRでデータフェッチしてください
