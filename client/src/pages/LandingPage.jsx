import { useNavigate } from 'react-router-dom'

function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Welcome to Intelligent Trip Planner
        </h1>
        <p className="text-gray-600 mb-8">
          Plan your perfect trip with AI-powered recommendations
        </p>
        <button
          onClick={() => navigate('/new')}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Get Started
        </button>
      </div>
    </div>
  )
}

export default LandingPage