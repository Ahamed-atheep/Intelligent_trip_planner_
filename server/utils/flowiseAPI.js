const callFlowise = async (tripInput) => {
  try {
    console.log('Calling Flowise with:', tripInput);
    const response = await fetch(
      "https://cloud.flowiseai.com/api/v1/prediction/1aa9e155-879f-4e50-9d41-061d16f7f7c0",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          question: `Plan a trip from ${tripInput.origin} to ${tripInput.destination} for ${tripInput.numDays} days with ${tripInput.budgetLevel} budget for ${tripInput.travellersType} traveller(s). Include flights, hotels, transport options, points of interest, and daily itinerary.`
        })
      }
    );
    
    const result = await response.json();
    console.log('Raw Flowise response:', result);
    console.log('Response text:', result.text);
    
    // Check if result.text contains JSON
    const text = result.text || '';
    
    // Try to find JSON in the text
    let jsonStart = text.indexOf('{');
    let jsonEnd = text.lastIndexOf('}');
    
    if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
      try {
        const jsonStr = text.substring(jsonStart, jsonEnd + 1);
        console.log('Extracted JSON string:', jsonStr);
        const parsed = JSON.parse(jsonStr);
        console.log('Successfully parsed data:', parsed);

        // Ensure transport data is included, even if API doesn't provide it
        if (!parsed.transport || !Array.isArray(parsed.transport) || parsed.transport.length === 0) {
          parsed.transport = [
            {
              "type": "Taxi",
              "description": "Local transportation options available",
              "estimatedCost": "₹500-1000"
            }
          ];
        }

        return parsed;
      } catch (parseError) {
        console.log('JSON parse failed:', parseError.message);
      }
    }
    
    // If JSON parsing fails, return text as summary
    console.log('No valid JSON found, returning text as summary');
    return { summary: text || 'Trip plan generated', flights: [], hotels: [], poi: [], itinerary: [] };
  } catch (error) {
    console.error('Flowise API error:', error);
    // Return sample data when API fails
    return {
      "summary": `${tripInput.numDays}-day trip from ${tripInput.origin} to ${tripInput.destination} (API quota exceeded - showing sample data)`,
      "flights": [
        {
          "airline": "Sample Airlines",
          "from": tripInput.origin,
          "to": tripInput.destination,
          "departureTime": "08:00",
          "arrivalTime": "11:30",
          "duration": "3 hours 30 minutes",
          "stops": 0,
          "price": 8000,
          "currency": "INR"
        }
      ],
      "hotels": [
        {
          "name": "Sample Hotel",
          "address": `Downtown ${tripInput.destination}`,
          "pricePerNight": 4500,
          "currency": "INR",
          "rating": 4.2,
          "reviewCount": 1000,
          "checkInTime": "14:00",
          "checkOutTime": "12:00"
        }
      ],
      "transport": [
        {
          "type": "Taxi",
          "description": "Airport to Hotel transfer",
          "estimatedCost": "₹600"
        }
      ],
      "poi": [
        {
          "name": "City Center",
          "type": "landmark",
          "description": "Main tourist area with shops and restaurants",
          "recommendedDuration": 120,
          "bestTimeToVisit": "morning"
        }
      ],
      "itinerary": [
        {
          "day": 1,
          "activities": "Arrival and city exploration",
          "time": "Full Day"
        }
      ]
    };
  }
};

export { callFlowise };