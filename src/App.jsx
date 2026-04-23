// src/App.jsx
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Watermark from './components/Watermark'

// Páginas públicas
import Home from './pages/Home'
import Inscripcion from './pages/Inscripcion'
import Eventos from './pages/Eventos'
import Docentes from './pages/Docentes'
import Invitados from './pages/Invitados'
import Contacto from './pages/Contacto'

// Panel de administración
import AdminPanel from './pages/admin/AdminPanel'
import AdminMiembros from './pages/admin/AdminMiembros'
import AdminEventos from './pages/admin/AdminEventos'
import AdminSolicitudes from './pages/admin/AdminSolicitudes'
import AdminConsultas from './pages/admin/AdminConsultas'
import AdminMiembrosDestacados from './pages/admin/AdminMiembrosDestacados'
// Página 404
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Routes>
          {/* ── Públicas ── */}
          <Route path="/"            element={<Home />} />
          <Route path="/inscripcion" element={<Inscripcion />} />
          <Route path="/eventos"     element={<Eventos />} />
          <Route path="/docentes"    element={<Docentes />} />
          <Route path="/invitados"   element={<Invitados />} />
          <Route path="/contacto"    element={<Contacto />} />

          {/* ── Admin ── */}
          <Route path="/admin"                  element={<AdminPanel />} />
          <Route path="/admin/miembros"         element={<AdminMiembros />} />
          <Route path="/admin/eventos"          element={<AdminEventos />} />
          <Route path="/admin/solicitudes"      element={<AdminSolicitudes />} />
          <Route path="/admin/consultas"        element={<AdminConsultas />} />
<Route path="/admin/destacados" element={<AdminMiembrosDestacados />} />
          {/* ── 404 ── */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <Watermark />
    </div>
  )
}
