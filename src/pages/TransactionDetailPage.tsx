import { useParams, Link } from 'react-router-dom'
import { useTransactionDetail } from '../hooks/useTransactionsData'

export default function TransactionDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { data, loading, error } = useTransactionDetail(id)

  return (
    <div style={{ padding: 24, maxWidth: 900, margin: '0 auto' }}>
      <p><Link to="/" style={{ color: '#0066cc' }}>← Back to list</Link></p>
      <h1 style={{ marginTop: 0 }}>Transaction {data?.id ?? '—'}</h1>
      <p style={{ color: '#666', marginBottom: 16 }}>
        GET /api/transactions/:id — detail. To update: PATCH same URL with body{' '}
        <code style={{ background: '#eee', padding: '2px 6px', borderRadius: 4 }}>
          {`{ "action": "approve" | "decline" | "mark_reviewed" }`}
        </code>
        . Use <code style={{ background: '#eee', padding: '2px 6px', borderRadius: 4 }}>availableActions</code> on this response to see which actions are allowed.
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
