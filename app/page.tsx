'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

export default function Home() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function createSession() {
      try {
        const res = await fetch('/api/create-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
        
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || 'Failed to create session');
        }
        
        const data = await res.json();
        setClientSecret(data.client_secret);
      } catch (err) {
        console.error('Session error:', err);
        setError(err instanceof Error ? err.message : 'Failed to initialize chat');
      } finally {
        setLoading(false);
      }
    }
    
    createSession();
  }, []);

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>Loading chat...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.error}>
          <h2>Error</h2>
          <p>{error}</p>
          <p style={styles.hint}>
            Make sure you have set OPENAI_API_KEY and NEXT_PUBLIC_CHATKIT_WORKFLOW_ID
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Script
        src="https://cdn.openai.com/chatkit/chatkit.js"
        strategy="beforeInteractive"
      />
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>The Bullet Gym</h1>
          <p style={styles.subtitle}>Assistente Virtuale</p>
        </div>
        {clientSecret && (
          <openai-chatkit
            client-secret={clientSecret}
            style={{ width: '100%', height: '600px' }}
          />
        )}
      </div>
    </>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  title: {
    fontSize: '2rem',
    color: '#1a1a1a',
    margin: 0,
  },
  subtitle: {
    fontSize: '1rem',
    color: '#666',
    margin: '8px 0 0',
  },
  loading: {
    fontSize: '1.2rem',
    color: '#666',
  },
  error: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    textAlign: 'center',
    maxWidth: '400px',
  },
  hint: {
    fontSize: '0.9rem',
    color: '#999',
    marginTop: '15px',
  },
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'openai-chatkit': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & { 'client-secret'?: string },
        HTMLElement
      >;
    }
  }
}
