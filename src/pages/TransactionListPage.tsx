import { useState, useEffect } from 'react'
import type { TransactionListResponse } from '../types/transactions'

export default function TransactionListPage() {
  const [data, setData] = useState<TransactionListResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    fetch('/api/transactions')
      .then((res) => res.json())
      .then((json: TransactionListResponse) => {
        if (!cancelled) setData(json)
      })
      .catch((e: Error) => {
        if (!cancelled) setError(e.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [])

  if (loading) return <p>Loading…</p>
  if (error) return <p style={{ color: '#c00' }}>{error}</p>
  if (!data) return null

  return (
    <div style={{ padding: 24, maxWidth: 900, margin: '0 auto' }}>
      <h1 style={{ marginTop: 0 }}>Transactions</h1>
      <p style={{ color: '#666', marginBottom: 16 }}>
        GET /api/transactions — list response. To view a single transaction, go to /transactions/:id (e.g. /transactions/txn_1024).
      </p>
      <pre
        style={{
          background: '#f5f5f5',
          padding: 16,
          overflow: 'auto',
          fontSize: 12,
          textAlign: 'left',
          border: '1px solid #ddd',
          borderRadius: 4,
        }}
      >
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  )
}
