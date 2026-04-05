import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import WidgetBuilder from './WidgetBuilder'
import GlobalDefaults from './GlobalDefaults'
import Clients from './Clients'

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/clients" element={<Clients />} />
          <Route path="/widget-builder" element={<WidgetBuilder />} />
          <Route path="/global-defaults" element={<GlobalDefaults />} />
          <Route path="*" element={<Navigate to="/clients" replace />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  )
}