import { Layout } from '../components/Layout'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()
  return (
    <Layout title={'Home'}>
      <p>Home</p>
      <Link href="/ssr" prefetch={false} className="my-3 text-xs text-blue-500">
        Link to ssr
      </Link>
      <Link href="/csr" prefetch={false} className="my-3 text-xs text-blue-500">
        Link to csr
      </Link>
      <Link href="/ssg" prefetch={false} className="my-3 text-xs text-blue-500">
        Link to ssg
      </Link>
      <Link href="/isr" prefetch={false} className="my-3 text-xs text-blue-500">
        Link to isr
      </Link>
      <button className="my-3 text-xs" onClick={() => router.push('/ssr')}>
        Route to ssr
      </button>
      <button className="my-3 text-xs" onClick={() => router.push('/csr')}>
        Route to csr
      </button>
      <button className="my-3 text-xs" onClick={() => router.push('/ssg')}>
        Route to ssg
      </button>
      <button className="my-3 text-xs" onClick={() => router.push('/isr')}>
        Route to isr
      </button>
    </Layout>
  )
}
