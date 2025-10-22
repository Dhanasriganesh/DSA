import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { DataProvider } from './context/DataContext'
import ScrollToTop from './components/ScrollToTop'
import PopupModal from './components/PopupModal'

// Public Site
import Layout from './components/layout/Layout'
import Home from './components/pages/Home'
import About from './components/pages/About'
import Contact from './components/pages/Contact'

// Admin
import Login from './components/admin/Login'
import ProtectedRoute from './components/admin/ProtectedRoute'
import AdminLayout from './components/admin/layout/AdminLayout'
import Dashboard from './components/admin/pages/Dashboard'
import ProjectsManagement from './components/admin/pages/ProjectsManagement'
import TestimonialsManagement from './components/admin/pages/TestimonialsManagement'
import TeamManagement from './components/admin/pages/TeamManagement'
import ContactSubmissions from './components/admin/pages/ContactSubmissions'
import HeroImagesManagement from './components/admin/pages/HeroImagesManagement'
import AboutContentManagement from './components/admin/pages/AboutContentManagement'
import ContactContentManagement from './components/admin/pages/ContactContentManagement'
import DataMigration from './components/admin/pages/DataMigration'

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <ScrollToTop />
          <PopupModal />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/about" element={<Layout><About /></Layout>} />
            <Route path="/contact" element={<Layout><Contact /></Layout>} />

            {/* Admin Routes */}
            <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
            <Route path="/admin/login" element={<Login />} />

            {/* Protected Admin Routes */}
            <Route path="/admin/dashboard" element={
              <ProtectedRoute>
                <AdminLayout><Dashboard /></AdminLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/projects" element={
              <ProtectedRoute>
                <AdminLayout><ProjectsManagement /></AdminLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/testimonials" element={
              <ProtectedRoute>
                <AdminLayout><TestimonialsManagement /></AdminLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/team" element={
              <ProtectedRoute>
                <AdminLayout><TeamManagement /></AdminLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/contacts" element={
              <ProtectedRoute>
                <AdminLayout><ContactSubmissions /></AdminLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/hero-images" element={
              <ProtectedRoute>
                <AdminLayout><HeroImagesManagement /></AdminLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/about-content" element={
              <ProtectedRoute>
                <AdminLayout><AboutContentManagement /></AdminLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/contact-content" element={
              <ProtectedRoute>
                <AdminLayout><ContactContentManagement /></AdminLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/data-migration" element={
              <ProtectedRoute>
                <AdminLayout><DataMigration /></AdminLayout>
              </ProtectedRoute>
            } />
          </Routes>
        </Router>
      </DataProvider>
    </AuthProvider>
  )
}

export default App
