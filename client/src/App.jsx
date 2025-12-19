import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import NewTripForm from './pages/NewTripForm'
import TripDetail from './pages/TripDetail'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/new" element={<NewTripForm />} />
          <Route path="/trip/:id" element={<TripDetail />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App