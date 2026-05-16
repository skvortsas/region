import { cacheLife } from 'next/cache'

import { Header } from '@/components/sections/Header'
import { Hero } from '@/components/sections/Hero'
import { Map } from '@/components/sections/Map'
import { Roles } from '@/components/sections/Roles'
import { Cars } from '@/components/sections/Cars'
import { RPEconomy } from '@/components/sections/RPEconomy'
import { Tagline } from '@/components/sections/Tagline'
import { HowToPlay } from '@/components/sections/HowToPlay'
import { Footer } from '@/components/sections/Footer'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Region RP',
  legalName: 'ООО «1 Геймс»',
  url: SITE_URL,
  email: 'hello@1games.ru',
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/logo.png`,
    width: 512,
    height: 512,
  },
  sameAs: [
    'TBD: Discord invite URL',
    'TBD: VK community URL',
    'TBD: Telegram channel URL (primary)',
    'TBD: Telegram channel URL (secondary)',
  ],
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Region RP',
  url: SITE_URL,
  inLanguage: 'ru-RU',
}

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'Region RP',
  description:
    'GTA 5 RP проект с детализированными картами Санкт-Петербурга и Тольятти. Выбирай роль и строй свою историю с нуля.',
  genre: 'Role-playing',
  gamePlatform: 'RAGE:MP',
  operatingSystem: 'Windows',
  applicationCategory: 'Game',
  url: SITE_URL,
  publisher: {
    '@type': 'Organization',
    name: 'ООО «1 Геймс»',
  },
}

export default async function Home() {
  'use cache'
  cacheLife('max')

  return (
    <>
      <Header />
      <main>
        <script
          key="org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          key="website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          key="game"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }}
        />
        <section id="hero" className="contents">
          <Hero />
        </section>
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
