import React from 'react';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';

export default function Developers() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ padding: '120px 5%', maxWidth: '800px', margin: '0 auto', color: '#fff', minHeight: '100vh' }}
    >
      <SEO title="Developer Portal" description="Developer Portal and API access for Prathamesh Patil's portfolio." />
      <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>Prathamesh Patil Developer Portal</h1>
      <div style={{ fontSize: '1.2rem', lineHeight: '1.6', opacity: 0.8 }}>
        <p style={{ marginBottom: '1rem' }}>
          Welcome to the Prathamesh Patil Developer Portal. This section is designed for developers, AI agents, 
          and technical recruiters who want to programmatically interact with the portfolio data. 
          Here, you will find everything you need to get started with our public API.
        </p>
        <h2 style={{ fontSize: '2rem', marginTop: '2rem', marginBottom: '1rem' }}>API Documentation</h2>
        <p style={{ marginBottom: '1rem' }}>
          Our public API allows you to fetch a list of my latest projects, case studies, and relevant metadata. 
          The API is fully documented using the OpenAPI 3.0 specification. 
          You can view the raw OpenAPI JSON specification at <a href="/openapi.json" style={{ color: 'var(--accent)' }}>/openapi.json</a>.
        </p>
        <h2 style={{ fontSize: '2rem', marginTop: '2rem', marginBottom: '1rem' }}>API Keys</h2>
        <p style={{ marginBottom: '1rem' }}>
          Currently, the API is open and does not require authentication keys for read-only access. 
          For authenticated operations (coming soon), you can generate a mock API key by running the following command in your terminal:
        </p>
        <pre style={{ background: '#111', padding: '1rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1rem', fontFamily: 'monospace' }}>
          <code>
{`curl -X POST https://prathameshxd.vercel.app/api/v1/keys \\
  -H "Content-Type: application/json" \\
  -d '{"email":"developer@example.com"}'`}
          </code>
        </pre>

        <h2 style={{ fontSize: '2rem', marginTop: '2rem', marginBottom: '1rem' }}>Quickstart Guide</h2>
        <p style={{ marginBottom: '1rem' }}>
          To fetch the list of projects, you can make a simple GET request to the `/api/v1/projects` endpoint.
        </p>
        <pre style={{ background: '#111', padding: '1rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1rem', fontFamily: 'monospace' }}>
          <code>
{`fetch('https://prathameshxd.vercel.app/api/v1/projects')
  .then(response => response.json())
  .then(data => console.log(data));`}
          </code>
        </pre>

        <h2 style={{ fontSize: '2rem', marginTop: '2rem', marginBottom: '1rem' }}>Sandbox Environment</h2>
        <p style={{ marginBottom: '1rem' }}>
          You can test our API endpoints in a sandbox environment before integrating them into your application. 
          Use our interactive Swagger UI (coming soon) or try making a request directly from your browser:
        </p>
        <a href="/api/v1/projects" target="_blank" rel="noreferrer" style={{ display: 'inline-block', padding: '10px 20px', background: 'var(--accent)', color: '#000', textDecoration: 'none', borderRadius: '4px', fontWeight: 'bold', marginBottom: '1rem' }}>Try Sandbox /api/v1/projects</a>

        <p style={{ marginTop: '2rem', marginBottom: '1rem' }}>
          For AI Agents: Please refer to the <a href="/llms.txt" style={{ color: 'var(--accent)' }}>/llms.txt</a> file for specific guidelines on when and how to use these endpoints to answer user queries effectively.
        </p>
      </div>
    </motion.div>
  );
}
