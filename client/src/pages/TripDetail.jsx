import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function TripDetail() {
  const { id } = useParams()
  const [trip, setTrip] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const response = await axios.get(`http://localhost:5004/api/trips/${id}`)
        console.log('Full trip data:', response.data)
        console.log('Transport data:', response.data.transport)
        setTrip(response.data)
      } catch (error) {
        console.error('Error fetching trip:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTrip()
  }, [id])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!trip) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold text-gray-800">Trip not found</h2>
      </div>
    )
  }

  const renderFlights = (flights) => (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4">✈️ Flights</h3>
      {flights && flights.length > 0 ? (
        <div className="space-y-3">
          {flights.map((flight, index) => (
            <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">{flight.airline}</span>
                <span className="text-blue-600 font-bold">₹{flight.price}</span>
              </div>
              <div className="text-sm text-gray-600">
                <p>{flight.from} → {flight.to}</p>
                <p>{flight.departureTime} - {flight.arrivalTime}</p>
                <p>{flight.duration} • {flight.stops === 0 ? 'Direct' : `${flight.stops} stop(s)`}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No flights available</p>
      )}
    </div>
  )

  const renderHotels = (hotels) => (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4">🏨 Hotels</h3>
      {hotels && hotels.length > 0 ? (
        <div className="space-y-3">
          {hotels.map((hotel, index) => (
            <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">{hotel.name}</span>
                <span className="text-green-600 font-bold">₹{hotel.pricePerNight}/night</span>
              </div>
              <div className="text-sm text-gray-600">
                <p>⭐ {hotel.rating} ({hotel.reviewCount} reviews)</p>
                <p>📍 {hotel.address}</p>
                <p>🕐 Check-in: {hotel.checkInTime} | Check-out: {hotel.checkOutTime}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No hotels available</p>
      )}
    </div>
  )

  const renderPOI = (poi) => (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4">📍 Points of Interest</h3>
      {poi && poi.length > 0 ? (
        <div className="space-y-3">
          {poi.map((place, index) => (
            <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <div className="font-semibold mb-2">{place.name}</div>
              <div className="text-sm text-gray-600">
                <p>{place.description}</p>
                <p>🏷️ {place.type} • ⏰ {place.recommendedDuration} mins</p>
                <p>🌅 Best time: {place.bestTimeToVisit}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No points of interest available</p>
      )}
    </div>
  )

  const renderItinerary = (itinerary) => (
    <div className="bg-white p-6 rounded-lg shadow-lg col-span-full">
      <h3 className="text-xl font-bold mb-4">📅 Itinerary</h3>
      {itinerary && itinerary.length > 0 ? (
        <div className="space-y-4">
          {itinerary.map((day, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <div className="font-semibold mb-2">Day {day.day} - {day.description}</div>
              <div className="text-sm text-gray-600">
                <p className="mb-2">📅 {day.date}</p>
                {day.segments && day.segments.length > 0 && (
                  <div className="space-y-2">
                    {day.segments.map((segment, segIndex) => (
                      <div key={segIndex} className="pl-4 border-l-2 border-blue-200">
                        <p className="font-medium">{segment.timeOfDay} - {segment.description}</p>
                        {segment.transport && segment.transport !== 'N/A' && (
                          <p className="text-xs text-blue-600">🚗 {segment.transport}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No itinerary available</p>
      )}
    </div>
  )

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {trip.input.origin} → {trip.input.destination}
        </h1>
        <p className="text-gray-600">
          {trip.input.startDate} to {trip.input.endDate} • {trip.input.numDays} days
        </p>
      </div>

      {trip.summary && (
        <div className="bg-blue-50 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-bold mb-2">Trip Summary</h2>
          <p>{trip.summary}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {renderFlights(trip.flights)}
        {renderHotels(trip.hotels)}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4">🚗 Transport</h3>
          <div className="space-y-3">
            {trip.transport && trip.transport.length > 0 ? (
              trip.transport.map((transport, index) => (
                <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="font-semibold mb-2">{transport.type}</div>
                  <div className="text-sm text-gray-600">
                    <p>{transport.description}</p>
                    <p>💰 {transport.estimatedCost}</p>
                  </div>
                </div>
              ))
            ) : (
              <div>
                <p className="text-gray-500 mb-2">No transport data available</p>
                <pre className="text-xs bg-gray-100 p-2 rounded">
                  {JSON.stringify(trip.transport, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
        {renderPOI(trip.poi)}
        {renderItinerary(trip.itinerary)}
      </div>
    </div>
  )
}

export default TripDetail