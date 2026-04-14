import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import WidgetBuilder from './WidgetBuilder'
import GlobalDefaults from './GlobalDefaults'
import Clients from './Clients'
import Documentation from './Documentation'
import { useClientStore } from './store/clientStore'

export default function App() {
  const loadClients = useClientStore((s) => s.loadClients)
  useEffect(() => {
    void loadClients()
  }, [loadClients])

  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/clients" element={<Clients />} />
          <Route path="/widget-builder" element={<WidgetBuilder />} />
          <Route path="/global-defaults" element={<GlobalDefaults />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="*" element={<Navigate to="/clients" replace />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  )
}