/* eslint-disable @next/next/no-html-link-for-pages */
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function NotFound() {
  return (
    <html lang="en">
      <head>
        <title>404 - Page Not Found | TreeBio</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
      </head>
      <body style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        backgroundColor: '#f8fafc',
        margin: 0,
        padding: '1rem'
      }}>
        <div style={{ 
          textAlign: 'center', 
          maxWidth: '500px', 
          padding: '3rem 2rem',
          backgroundColor: 'white',
          borderRadius: '1rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ fontSize: '6rem', margin: '0 0 1rem 0', color: '#3b82f6', fontWeight: 'bold' }}>
            404
          </div>
          <h1 style={{ fontSize: '2rem', margin: '0 0 1rem 0', color: '#1f2937', fontWeight: '600' }}>
            Page Not Found
          </h1>
          <p style={{ 
            color: '#6b7280', 
            marginBottom: '2rem', 
            fontSize: '1.125rem',
            lineHeight: '1.6'
          }}>
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a 
              href="/"
              style={{
                display: 'inline-block',
                padding: '0.75rem 2rem',
                backgroundColor: '#3b82f6',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                fontWeight: '500',
                transition: 'background-color 0.2s',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
            >
              Back to Home
            </a>
            <a 
              href="/admin"
              style={{
                display: 'inline-block',
                padding: '0.75rem 2rem',
                backgroundColor: '#f3f4f6',
                color: '#374151',
                textDecoration: 'none',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                fontWeight: '500',
                border: '1px solid #d1d5db',
                transition: 'background-color 0.2s',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e5e7eb'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
            >
              Dashboard
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
