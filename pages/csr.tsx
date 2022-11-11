import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabase'
import { Task, Notice } from '../types/types'
import { Layout } from '../components/Layout'
import Link from 'next/link'
import { useRouter } from 'next/router'

export const Csr: NextPage = () => {
  const router = useRouter()
  const [tasks, setTasks] = useState<Task[]>([])
  const [notices, setNotices] = useState<Notice[]>([])
  useEffect(() => {
    const getTasks = async () => {
      const { data: tasks } = await supabase
        .from('todos')
        .select('*')
        .order('created_at', { ascending: true })
      setTasks(tasks as Task[])
    }
    const getNotices = async () => {
      const { data: notices } = await supabase
        .from('notices')
        .select('*')
        .order('created_at', { ascending: true })
      setNotices(notices as Notice[])
    }
    getTasks()
    getNotices()
  }, [])
  return (
    <Layout title="CSR">
      <h1 className="my-3 text-blue-500">
        SSG + CSF（コンソールにWeb Vitalsを出力してます）
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
      <Link href="/isr" prefetch={false} className="my-3 text-xs text-blue-500">
        Link to isr
      </Link>
      <button className="my-3 text-xs" onClick={() => router.push('/ssr')}>
        Route to ssr
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

export default Csr
