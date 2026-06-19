// Shared brand styles for Poruke.app email templates
export const main = {
  backgroundColor: '#ffffff',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
  margin: 0,
  padding: 0,
}

export const container = {
  maxWidth: '520px',
  margin: '0 auto',
  padding: '32px 28px',
}

export const header = {
  textAlign: 'center' as const,
  padding: '20px 0 28px',
}

export const logoBadge = {
  display: 'inline-block',
  padding: '10px 18px',
  borderRadius: '12px',
  background: 'linear-gradient(135deg, #14b8a6 0%, #f97066 100%)',
  color: '#ffffff',
  fontSize: '18px',
  fontWeight: 700,
  letterSpacing: '-0.01em',
}

export const card = {
  background: '#f8fafc',
  border: '1px solid #e2e8f0',
  borderRadius: '16px',
  padding: '32px 28px',
}

export const h1 = {
  fontSize: '22px',
  fontWeight: 700 as const,
  color: '#0f172a',
  margin: '0 0 16px',
  lineHeight: '1.3',
}

export const text = {
  fontSize: '15px',
  color: '#475569',
  lineHeight: '1.6',
  margin: '0 0 20px',
}

export const button = {
  backgroundColor: '#14b8a6',
  color: '#ffffff',
  fontSize: '15px',
  fontWeight: 600 as const,
  borderRadius: '12px',
  padding: '14px 28px',
  textDecoration: 'none',
  display: 'inline-block',
}

export const code = {
  display: 'inline-block',
  fontSize: '28px',
  fontWeight: 700 as const,
  letterSpacing: '6px',
  color: '#0f172a',
  background: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: '12px',
  padding: '16px 24px',
  margin: '8px 0 20px',
}

export const footer = {
  fontSize: '12px',
  color: '#94a3b8',
  margin: '24px 0 0',
  textAlign: 'center' as const,
  lineHeight: '1.5',
}

export const link = { color: '#14b8a6', textDecoration: 'underline' }
