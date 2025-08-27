import React from "react";

const Suggestions = ({ fileData }) => {
  if (!fileData) return null;

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-2xl font-bold flex items-center mb-4 text-purple-700">
        <span className="mr-2">💡</span> Smart Suggestions
      </h2>

      <ul className="list-disc list-inside space-y-2 text-gray-700">
        <li>💰 Save at least ₹4800 this month.</li>
        <li>📈 Try investing part of larger transactions into mutual funds.</li>
        <li>🕒 Your average earning is low. Plan side gigs or extra shifts.</li>
      </ul>
    </div>
  );
};

export default Suggestions;