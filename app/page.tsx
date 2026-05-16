import { Header } from '@/components/sections/Header'
import { Hero } from '@/components/sections/Hero'
import { Map } from '@/components/sections/Map'
import { Roles } from '@/components/sections/Roles'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Map />
        <Roles />
      </main>
    </>
  )
}
