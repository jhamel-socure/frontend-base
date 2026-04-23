import { useState, useEffect } from 'react'
import type { TransactionDetail, TransactionListResponse } from '../types/transactions'

export function useTransactionList() {
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

  return { data, loading, error }
}

export function useTransactionDetail(id: string | undefined) {
  const [data, setData] = useState<TransactionDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) {
      setData(null)
      setLoading(false)
      setError(null)
      return
    }
    let cancelled = false
    setLoading(true)
    setError(null)
    fetch(`/api/transactions/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error(res.status === 404 ? 'Not found' : ` ${res.status}`)
        return res.json()
      })
      .then((json: TransactionDetail) => {
        if (!cancelled) setData(json)
      })
      .catch((e: Error) => {
        if (!cancelled) setError(e.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [id])

  return { data, loading, error }
}
