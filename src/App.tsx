import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import AppLayout from "./layout/AppLayout"
import Dashboard from "./pages/Dashboard"
import Transactions from "./pages/Transactions"
import Wallets from "./pages/Wallets"
import Reports from "./pages/Reports"
import Settings from "./pages/Settings"
import Home from "./pages/Home"


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/wallets" element={<Wallets />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="/home" element={<Home />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
