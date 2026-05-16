import { Header } from '@/components/sections/Header'
import { Hero } from '@/components/sections/Hero'
import { Map } from '@/components/sections/Map'
import { Roles } from '@/components/sections/Roles'
import { Cars } from '@/components/sections/Cars'
import { RPEconomy } from '@/components/sections/RPEconomy'
import { Tagline } from '@/components/sections/Tagline'
import { HowToPlay } from '@/components/sections/HowToPlay'
import { Footer } from '@/components/sections/Footer'

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
        <Tagline />
        <HowToPlay />
      </main>
      <Footer />
    </>
  )
}
