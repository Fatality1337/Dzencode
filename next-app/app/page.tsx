import Link from 'next/link';

async function getHealth() {
  const apiUrl = process.env.API_URL || 'http://localhost:4000';
  try {
    const response = await fetch(`${apiUrl}/health`, { next: { revalidate: 30 } });
    return response.ok;
  } catch {
    return false;
  }
}

export default async function SsrHomePage() {
  const apiAvailable = await getHealth();
  return <main style={{ minHeight: '100vh', background: '#f8fafc', padding: '72px 24px' }}>
    <section style={{ maxWidth: 860, margin: '0 auto', background: 'white', borderRadius: 24, padding: 48, boxShadow: '0 12px 40px #0f172a14' }}>
      <p style={{ color: '#4f46e5', fontWeight: 700, letterSpacing: 2 }}>INVENTORY SSR</p>
      <h1 style={{ fontSize: 48, margin: '16px 0' }}>Warehouse management platform</h1>
      <p style={{ color: '#64748b', fontSize: 18 }}>Server-rendered entry point for fast first paint, SEO and resilient backend health checks.</p>
      <p style={{ color: apiAvailable ? '#15803d' : '#b91c1c', fontWeight: 600 }}>Backend: {apiAvailable ? 'online' : 'unavailable'}</p>
      <Link href="http://localhost:5173/orders" style={{ display: 'inline-block', marginTop: 16, borderRadius: 12, background: '#4f46e5', padding: '12px 18px', color: 'white', textDecoration: 'none' }}>Open SPA dashboard</Link>
    </section>
  </main>;
}
