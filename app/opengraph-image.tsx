import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OGImage() {
  // Attempt to load Montserrat Bold from Google Fonts; fall back to system font if unavailable.
  // Uses Node.js runtime (no `runtime = 'edge'`) so the response is reliably served.
  let fonts: ConstructorParameters<typeof ImageResponse>[1]['fonts'] = []
  try {
    const res = await fetch(
      'https://fonts.gstatic.com/s/montserrat/v29/JTUSjIg1_i6t8kCHKm459Wlhzg.woff2'
    )
    if (res.ok) {
      const data = await res.arrayBuffer()
      fonts = [{ name: 'Montserrat', data, style: 'normal', weight: 700 }]
    }
  } catch {
    // Network unavailable — render with default system font
  }

  return new ImageResponse(
    (
      <div
        style={{
          background: '#020309',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Montserrat, sans-serif',
          padding: '60px',
        }}
      >
        <div
          style={{
            color: '#ffffff',
            fontSize: '72px',
            fontWeight: 800,
            letterSpacing: '-2px',
            marginBottom: '24px',
          }}
        >
          Region RP
        </div>
        <div
          style={{
            fontSize: '56px',
            fontWeight: 700,
            color: '#ff2830',
            marginBottom: '20px',
          }}
        >
          Новый сервер GTA 5 RP
        </div>
        <div
          style={{
            color: 'rgba(255,255,255,0.80)',
            fontSize: '32px',
            fontWeight: 500,
          }}
        >
          успей раскрутиться раньше всех
        </div>
      </div>
    ),
    {
      ...size,
      fonts,
    }
  )
}
