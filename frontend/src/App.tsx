import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import GoodsPage from './pages/GoodsPage'
import WantedPage from './pages/WantedPage'
import PostPage from './pages/PostPage'

function App() {
  return (
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/goods" element={<GoodsPage />} />
        <Route path="/wanted" element={<WantedPage />} />
        <Route path="/post" element={<PostPage />} />
      </Routes>
  )
}

export default App