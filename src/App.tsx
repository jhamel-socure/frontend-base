import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TransactionListPage from './pages/TransactionListPage'
import TransactionDetailPage from './pages/TransactionDetailPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TransactionListPage />} />
        <Route path="/transactions/:id" element={<TransactionDetailPage />} />
      </Routes>
    </BrowserRouter>
  )
}
