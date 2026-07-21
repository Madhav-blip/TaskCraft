import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from '@/routes/ProtectedRoute'
import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'
import DashboardLayout from '@/pages/DashboardLayout'
import TaskListView from '@/pages/TaskListView'
import UserProfileView from '@/pages/UserProfileView'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected Application Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<TaskListView />} />
          <Route path=":taskId" element={<TaskListView />} />
          <Route path="profile" element={<UserProfileView />} />
        </Route>
      </Route>
    </Routes>
  )
}
