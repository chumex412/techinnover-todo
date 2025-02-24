import Content from '@/components/ui/TaskContainer'
import { Header } from '@/components/ui/Header'

export default function Home() {
  return (
    <section className="flex-1 px-4 sm:px-5 md:px-7 lg:px-8 xl:px-[2.375rem]">
      <Header />
      <Content />
    </section>
  )
}
