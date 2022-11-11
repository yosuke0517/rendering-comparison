import Link from 'next/link'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import { GetStaticProps } from 'next'
import { Layout } from '../components/Layout'
import { supabase } from '../utils/supabase'
import { Task, Notice } from '../types/types'

export const getStaticProps: GetStaticProps = async () => {
  console.log('getStaticProps/isr invoked')
  const { data: tasks } = await supabase
    .from('todos')
    .select('*')
    .order('created_at', { ascending: true })
  const { data: notices } = await supabase
    .from('notices')
    .select('*')
    .order('created_at', { ascending: true })
  return { props: { tasks, notices }, revalidate: 5 }
}

type StaticProps = {
  tasks: Task[]
  notices: Notice[]
}

export const Isr: NextPage<StaticProps> = ({ tasks, notices }) => {
  const router = useRouter()
  return (
    <Layout title="ISR">
      <h1 className="my-3 text-indigo-500">
        ISR（コンソールにWeb Vitalsを出力してます）
      </h1>
      <ul className="my-3">
        {tasks.map((task) => {
          return (
            <li key={task.id}>
              <p className="text-lg font-extrabold">{task.title}</p>
            </li>
          )
        })}
      </ul>
      <ul className="my-3">
        {notices.map((notice) => {
          return (
            <li key={notice.id}>
              <p className="text-lg font-extrabold">{notice.content}</p>
            </li>
          )
        })}
      </ul>
      <Link href="/ssr" prefetch={false} className="my-3 text-xs text-blue-500">
        Link to ssr
      </Link>
      <Link href="/ssg" prefetch={false} className="my-3 text-xs text-blue-500">
        Link to ssg
      </Link>
      <Link href="/csr" prefetch={false} className="my-3 text-xs text-blue-500">
        Link to csr
      </Link>
      <button className="my-3 text-xs" onClick={() => router.push('/ssr')}>
        Route to ssr
      </button>
      <button className="my-3 text-xs" onClick={() => router.push('/ssg')}>
        Route to ssg
      </button>
      <button className="my-3 text-xs" onClick={() => router.push('/csr')}>
        Route to csr
      </button>
    </Layout>
  )
}

export default Isr
