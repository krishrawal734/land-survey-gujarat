import { Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import HomePage from '../pages/HomePage'
import PropertiesPage from '../pages/PropertiesPage'
import PropertyDetailPage from '../pages/PropertyDetailPage'
import LandSurveyPage from '../pages/LandSurveyPage'
import Contact from '../pages/Contact'
import NotFoundPage from '../pages/NotFoundPage'

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="properties" element={<PropertiesPage />} />
        <Route path="properties/:id" element={<PropertyDetailPage />} />
        <Route path="land-survey" element={<LandSurveyPage />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
