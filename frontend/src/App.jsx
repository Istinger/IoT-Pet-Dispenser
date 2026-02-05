import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import RegisterPet from './pages/RegisterPet'
import Menu from './pages/Menu'
import PetProfile from './pages/PetProfile'
import FeedingSchedulePage from './pages/FeedingSchedule'
import SettingsPage from './pages/Settings'
import AdminLogin from './pages/AdminLogin'
import AdminOverview from './admin/pages/AdminOverview'
import AdminLogs from './admin/pages/AdminLogs'
import AdminPerformance from './admin/pages/AdminPerformance'
import ProtectedRoute from './components/ProtectedRoute'
import AdminRoute from './components/AdminRoute'
import AdminUsers from './admin/pages/AdminUsers'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/registerPet" element={<ProtectedRoute><RegisterPet /></ProtectedRoute>} />
        <Route path="/menu" element={<ProtectedRoute><Menu /></ProtectedRoute>} />
        <Route path="/petProfile" element={<ProtectedRoute><PetProfile /></ProtectedRoute>} />
        <Route path="/feedingSchedule" element={<ProtectedRoute><FeedingSchedulePage /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminRoute><AdminOverview /></AdminRoute>} />
        <Route path="/admin/logs" element={<AdminRoute><AdminLogs /></AdminRoute>} />
        <Route path="/admin/performance" element={<AdminRoute><AdminPerformance /></AdminRoute>} />
        <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
      </Routes>
    </div>
  )
}

export default App
