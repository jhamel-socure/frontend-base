/**
 * API types for transaction list and detail.
 */

export type TransactionStatus =
  | 'approved'
  | 'declined'
  | 'needs_review'
  | 'reviewed'

export type RiskLevel = 'low' | 'medium' | 'high'

export type SignalSeverity = 'low' | 'medium' | 'high'

export interface Address {
  line1: string
  city: string
  state: string
  postalCode: string
  country: string
}

export interface Signal {
  id: string
  label: string
  severity: SignalSeverity
  description: string
}

export interface Note {
  id: string
  author: string
  createdAt: string
  body: string
}

/** Summary shape returned in GET /api/transactions list */
export interface TransactionSummary {
  id: string
  createdAt: string
  customerName: string
  email: string
  amount: number
  currency: string
  merchant: string
  status: TransactionStatus
  riskScore: number
  riskLevel: RiskLevel
  paymentMethod: string
  last4: string
  location: string | null
  hasChargeback: boolean
}

/** List response: GET /api/transactions */
export interface TransactionListResponse {
  transactions: TransactionSummary[]
  total: number
}

/** Full detail shape: GET /api/transactions/:id and PATCH response */
export interface TransactionDetail {
  id: string
  createdAt: string
  customerName: string
  email: string
  phone: string | null
  amount: number
  currency: string
  merchant: string
  merchantCategory: string
  status: TransactionStatus
  riskScore: number
  riskLevel: RiskLevel
  paymentMethod: string
  last4: string
  billingAddress: Address
  shippingAddress: Address | null
  ipAddress: string
  deviceId: string
  location: string | null
  hasChargeback: boolean
  velocity24h: number
  signals: Signal[]
  notes: Note[]
  availableActions: ('approve' | 'decline' | 'mark_reviewed')[]
}
