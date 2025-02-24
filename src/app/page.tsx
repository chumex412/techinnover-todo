import Content from '@/components/ui/TaskContainer'
import { Header } from '@/components/ui/Header'

export default function Home() {
  return (
    <section className="flex-1 px-4 lg:px-5 xl:px-8">
      <Header />
      <Content />
    </section>
  )
}
