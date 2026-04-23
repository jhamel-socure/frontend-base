import { useTransactionList } from '../hooks/useTransactionsData'

export default function TransactionListPage() {
  const { data, loading, error } = useTransactionList()

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
