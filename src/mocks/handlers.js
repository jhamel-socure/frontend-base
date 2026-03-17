import { http, HttpResponse } from 'msw';
import { transactions } from './fixtures/transactions.js';

function getAvailableActions(status) {
  switch (status) {
    case 'needs_review':
      return ['approve', 'decline', 'mark_reviewed'];
    case 'reviewed':
      return ['approve', 'decline'];
    case 'approved':
    case 'declined':
    default:
      return [];
  }
}

function toSummary(txn) {
  return {
    id: txn.id,
    createdAt: txn.createdAt,
    customerName: txn.customerName,
    email: txn.email,
    amount: txn.amount,
    currency: txn.currency,
    merchant: txn.merchant,
    status: txn.status,
    riskScore: txn.riskScore,
    riskLevel: txn.riskLevel,
    paymentMethod: txn.paymentMethod,
    last4: txn.last4,
    location: txn.location,
    hasChargeback: txn.hasChargeback,
  };
}

function applyAction(txn, action) {
  switch (action) {
    case 'approve':
      txn.status = 'approved';
      break;
    case 'decline':
      txn.status = 'declined';
      break;
    case 'mark_reviewed':
      txn.status = 'reviewed';
      break;
    default:
      return null;
  }
  txn.availableActions = getAvailableActions(txn.status);
  return txn;
}

export const handlers = [
  http.get('/api/transactions', () => {
    return HttpResponse.json({
      transactions: transactions.map(toSummary),
      total: transactions.length,
    });
  }),

  http.get('/api/transactions/:id', ({ params }) => {
    const txn = transactions.find((t) => t.id === params.id);
    if (!txn) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(txn);
  }),

  http.patch('/api/transactions/:id', async ({ params, request }) => {
    const txn = transactions.find((t) => t.id === params.id);
    if (!txn) {
      return new HttpResponse(null, { status: 404 });
    }
    let body;
    try {
      body = await request.json();
    } catch {
      return new HttpResponse(JSON.stringify({ error: 'Invalid JSON' }), {
        status: 400,
      });
    }
    const action = body?.action;
    if (!action || !['approve', 'decline', 'mark_reviewed'].includes(action)) {
      return new HttpResponse(
        JSON.stringify({ error: 'Missing or invalid action' }),
        { status: 400 }
      );
    }
    if (!txn.availableActions.includes(action)) {
      return new HttpResponse(
        JSON.stringify({ error: 'Action not allowed for this transaction' }),
        { status: 422 }
      );
    }
    applyAction(txn, action);
    return HttpResponse.json(txn);
  }),
];
