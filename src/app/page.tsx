import Content from '@/components/ui/TaskContainer'
import { Header } from '@/components/ui/Header'
import { Sidebar } from '@/components/ui/Sidebar'

// const todoList: Task[] = [
//   {
//     id: '1',
//     title: 'Start washing',
//     priority: 'low',
//     status: 'pending',
//     timestamp: new Date(),
//   },
// ]
// let progressList: Task[] = []
// let completedList: Task[] = []

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <section className="flex-1 px-4 lg:px-5 xl:px-8">
        <Header />
        <Content />
      </section>
    </div>
  )
}
