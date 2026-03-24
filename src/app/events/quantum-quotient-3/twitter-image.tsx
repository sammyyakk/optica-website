import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Quantum Quotient 3.0 - BVP Optica Quiz'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000814',
          backgroundImage: 'radial-gradient(circle at 25% 25%, #1e3a8a 0%, transparent 50%), radial-gradient(circle at 75% 75%, #7c3aed 0%, transparent 50%)',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Grid overlay */}
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: 0.15,
            backgroundImage: 'linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />

        {/* Orbital rings */}
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            border: '2px solid rgba(59, 130, 246, 0.2)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            border: '2px solid rgba(139, 92, 246, 0.15)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* Content */}
        <div
           style={{
             display: 'flex',
             flexDirection: 'column',
             alignItems: 'center',
             justifyContent: 'center',
             zIndex: 10,
             padding: '60px',
             textAlign: 'center',
           }}
        >
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: '#3b82f6',
              marginBottom: 24,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              background: 'rgba(59, 130, 246, 0.1)',
              padding: '12px 32px',
              borderRadius: '50px',
              border: '2px solid rgba(59, 130, 246, 0.4)',
              display: 'flex',
            }}
          >
            BVP OPTICA PRESENTS
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              fontSize: 96,
              fontWeight: 900,
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 30%, #06b6d4 70%, #10b981 100%)',
              backgroundClip: 'text',
              color: 'transparent',
              marginBottom: 16,
              textAlign: 'center',
              lineHeight: 1,
              textShadow: '0 0 60px rgba(59, 130, 246, 0.5)',
            }}
          >
            <div style={{ display: 'flex' }}>QUANTUM</div>
            <div style={{ display: 'flex', marginTop: '12px' }}>QUOTIENT 3.0</div>
          </div>

          <div
            style={{
              fontSize: 28,
              color: '#cbd5e1',
              marginBottom: 32,
              fontWeight: 500,
              lineHeight: 1.4,
            }}
          >
            The Ultimate Optics & Photonics Quiz
          </div>

          <div
             style={{
               display: 'flex',
               gap: '20px',
               marginTop: '8px',
               alignItems: 'center',
             }}
          >
             <div style={{ display: 'flex', padding: '14px 28px', background: 'rgba(59, 130, 246, 0.15)', borderRadius: '16px', border: '2px solid rgba(59, 130, 246, 0.4)', color: '#93c5fd', fontSize: 22, fontWeight: 700 }}>
               March 27, 2026
             </div>
             <div style={{ display: 'flex', padding: '14px 28px', background: 'rgba(139, 92, 246, 0.15)', borderRadius: '16px', border: '2px solid rgba(139, 92, 246, 0.4)', color: '#c4b5fd', fontSize: 22, fontWeight: 700 }}>
               30 Questions
             </div>
             <div style={{ display: 'flex', padding: '14px 28px', background: 'rgba(6, 182, 212, 0.15)', borderRadius: '16px', border: '2px solid rgba(6, 182, 212, 0.4)', color: '#67e8f9', fontSize: 22, fontWeight: 700 }}>
               30 Minutes
             </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
