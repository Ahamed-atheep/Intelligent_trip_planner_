import React from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  function handleStart() {
    navigate("/form");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl md:text-3xl font-semibold text-gray-900 mb-6">
          Welcome to Intelligent Trip Planner
        </h1>
        <button
          onClick={handleStart}
          className="px-6 py-2 rounded-full bg-blue-600 text-white text-base md:text-lg hover:bg-blue-700 transition-colors"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
