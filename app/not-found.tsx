import Link from 'next/link';

export default function NotFound() {
  return (
    <html>
      <head>
        <title>404 - Page Not Found</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, sans-serif',
        backgroundColor: '#f9fafb',
        margin: 0
      }}>
        <div style={{ textAlign: 'center', maxWidth: '400px', padding: '2rem' }}>
          <h1 style={{ fontSize: '4rem', margin: '0 0 1rem 0', color: '#374151' }}>404</h1>
          <h2 style={{ fontSize: '1.5rem', margin: '0 0 1rem 0', color: '#1f2937' }}>Page Not Found</h2>
          <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
            The page you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link 
            href="/"
            style={{
              display: 'inline-block',
              padding: '0.75rem 1.5rem',
              backgroundColor: '#3b82f6',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '0.5rem',
              marginRight: '1rem'
            }}
          >
            Go Home
          </Link>
          <Link 
            href="/admin"
            style={{
              display: 'inline-block',
              padding: '0.75rem 1.5rem',
              backgroundColor: '#e5e7eb',
              color: '#374151',
              textDecoration: 'none',
              borderRadius: '0.5rem'
            }}
          >
            Dashboard
          </Link>
        </div>
      </body>
    </html>
  );
}
