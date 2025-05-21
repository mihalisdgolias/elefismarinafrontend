import React from 'react';
import { useLocation, Link } from 'react-router-dom';

export default function Confirmation() {
  const { state } = useLocation();

  if (!state) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold">No confirmation data found.</h1>
        <Link to="/" className="text-blue-600 underline">Back to Home</Link>
      </div>
    );
  }

  const { slot, startDate, endDate, startTime, endTime, totalPrice } = state;

  return (
    <div className="p-8 max-w-lg mx-auto text-center bg-white rounded-xl shadow-md">
      <h1 className="text-3xl font-bold mb-4">🎉 Booking Confirmed</h1>
      <p className="mb-2"><strong>Slot:</strong> {slot}</p>
      <p className="mb-2"><strong>Date:</strong> {startDate} to {endDate}</p>
      <p className="mb-2"><strong>Time:</strong> {startTime} to {endTime}</p>
      <p className="mb-4"><strong>Total:</strong> ${totalPrice}</p>
      <Link to="/" className="text-blue-600 hover:underline">Go to Home</Link>
    </div>
  );
}
