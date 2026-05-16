import type { Metadata } from 'next'
import Link from 'next/link'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Политика обработки файлов cookie',
    robots: { index: false, follow: false },
  }
}

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-bg px-4 py-16 md:px-12 md:py-24">
      <div className="mx-auto max-w-[820px] text-white">
        <div className="mb-8 rounded-card border border-accent/40 bg-accent/10 px-5 py-3 text-accent text-sm font-semibold">
          ⚠️ Черновик — требует проверки юристом
        </div>

        <Link href="/" className="mb-6 inline-block text-white/60 hover:text-white transition">
          ← На главную
        </Link>

        <h1 className="text-h2 lg:text-display font-extrabold leading-tight mb-8">
          Политика обработки файлов cookie
        </h1>

        <article className="flex flex-col gap-5 text-white/80 leading-[1.6]">
          <h2 className="text-h3 font-bold text-white mt-4">1. Что такое файлы cookie</h2>
          <p>
            Файлы cookie — это небольшие текстовые файлы, которые сохраняются на вашем устройстве
            (компьютере, смартфоне или планшете) при посещении сайта Region RP. Они позволяют
            сайту запоминать ваши предпочтения, улучшать работу отдельных функций и собирать
            обезличенную аналитическую информацию о посещаемости. Использование cookie не
            означает автоматической идентификации Пользователя как конкретного физического лица.
          </p>

          <h2 className="text-h3 font-bold text-white mt-4">2. Типы используемых файлов cookie</h2>
          <p>На сайте Region RP используются следующие категории файлов cookie:</p>

          <h3 className="text-body font-semibold text-white mt-2">Необходимые (Essential)</h3>
          <p>
            Обязательные файлы cookie обеспечивают базовую функциональность сайта: навигацию,
            сохранение пользовательской сессии, защиту от CSRF-атак. Без них корректная работа
            сайта невозможна. Эти cookie не требуют вашего согласия в соответствии с
            действующим законодательством.
          </p>

          <h3 className="text-body font-semibold text-white mt-2">Аналитические (Analytics)</h3>
          <p>
            Аналитические файлы cookie помогают понять, как Пользователи взаимодействуют с
            сайтом. Мы используем следующие сервисы:
          </p>
          <ul className="list-disc list-inside flex flex-col gap-2 pl-2">
            <li>
              <strong className="text-white">Google Analytics 4</strong> — отслеживает
              источники трафика, просмотренные страницы, время на сайте. Данные обрабатываются
              Google в соответствии с их политикой конфиденциальности;
            </li>
            <li>
              <strong className="text-white">Яндекс.Метрика</strong> — аналитический сервис
              для русскоязычной аудитории, включает функции тепловых карт и записи визитов
              (вебвизор). Данные обрабатываются Яндексом согласно их политике конфиденциальности.
            </li>
          </ul>

          <h3 className="text-body font-semibold text-white mt-2">Маркетинговые (Marketing)</h3>
          <p>
            Маркетинговые cookie могут использоваться для показа релевантной рекламы на
            сторонних площадках. На данный момент Region RP не запускает ретаргетинговых
            рекламных кампаний. При их введении в будущем Политика будет обновлена, а
            Пользователи уведомлены через сайт.
          </p>

          <h2 className="text-h3 font-bold text-white mt-4">3. Как управлять файлами cookie</h2>
          <p>
            Вы можете в любой момент отключить или удалить файлы cookie через настройки вашего
            браузера. Ниже приведены ссылки на инструкции для наиболее популярных браузеров:
          </p>
          <ul className="list-disc list-inside flex flex-col gap-2 pl-2">
            <li>Google Chrome: Настройки → Конфиденциальность и безопасность → Файлы cookie;</li>
            <li>Mozilla Firefox: Настройки → Приватность и защита → Cookie и данные сайтов;</li>
            <li>Safari: Настройки → Конфиденциальность → Управление данными сайтов;</li>
            <li>Microsoft Edge: Настройки → Файлы cookie и разрешения сайтов.</li>
          </ul>
          <p>
            Обратите внимание: отключение необходимых файлов cookie может повлиять на
            функциональность сайта и доступность отдельных его разделов.
          </p>

          <h2 className="text-h3 font-bold text-white mt-4">4. Согласие и контакты</h2>
          <p>
            Продолжая использовать сайт Region RP, вы подтверждаете своё согласие с настоящей
            Политикой обработки файлов cookie. Настоящая Политика может быть изменена
            ООО «1 Геймс» в одностороннем порядке. По вопросам, связанным с обработкой
            файлов cookie, обращайтесь по адресу: hello@1games.ru.
          </p>
        </article>
      </div>
    </main>
  )
}
