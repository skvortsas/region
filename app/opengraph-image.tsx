import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OGImage() {
  const montserratBold = await fetch(
    'https://fonts.gstatic.com/s/montserrat/v29/JTUSjIg1_i6t8kCHKm459Wlhzg.woff2'
  ).then((r) => r.arrayBuffer())

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
          fontFamily: 'Montserrat',
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
      fonts: [
        {
          name: 'Montserrat',
          data: montserratBold,
          style: 'normal',
          weight: 700,
        },
      ],
    }
  )
}
