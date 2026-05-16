import { Header } from '@/components/sections/Header'
import { Hero } from '@/components/sections/Hero'
import { Map } from '@/components/sections/Map'
import { Roles } from '@/components/sections/Roles'
import { Cars } from '@/components/sections/Cars'
import { RPEconomy } from '@/components/sections/RPEconomy'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Map />
        <Roles />
        <Cars />
        <RPEconomy />
      </main>
    </>
  )
}
