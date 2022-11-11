import { NextPage } from 'next'
import { GetStaticProps } from 'next'
import { Layout } from '../components/Layout'
import { supabase } from '../utils/supabase'
import { Task, Notice } from '../types/types'
import Link from 'next/link'
import { useRouter } from 'next/router'

export const getStaticProps: GetStaticProps = async () => {
  console.log('getStaticProps/ssg invoked')
  const { data: tasks } = await supabase
    .from('todos')
    .select('*')
    .order('created_at', { ascending: true })
  const { data: notices } = await supabase
    .from('notices')
    .select('*')
    .order('created_at', { ascending: true })
  return { props: { tasks, notices } }
}

type StaticProps = {
  tasks: Task[]
  notices: Notice[]
}

export const Ssg: NextPage<StaticProps> = ({ tasks, notices }) => {
  const router = useRouter()
  return (
    <Layout title={'Ssg'}>
      <h1 className="my-3 text-blue-500">
        SSG（コンソールにWeb Vitalsを出力してます）
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
      <Link href="/csr" prefetch={false} className="my-3 text-xs text-blue-500">
        Link to csr
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
      <button className="my-3 text-xs" onClick={() => router.push('/isr')}>
        Route to isr
      </button>
    </Layout>
  )
}

export default Ssg
