import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SlotSelection() {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchSlots() {
      try {
        const res = await fetch('${process.env.REACT_APP_API_BASE}/api/bookings/available');
        if (!res.ok) throw new Error('Failed to load slots');
        const data = await res.json();
        setSlots(data);
      } catch (err) {
        console.error(err);
        alert('Error fetching slots');
      } finally {
        setLoading(false);
      }
    }
    fetchSlots();
  }, []);

  const handleSelect = (slot) => {
    navigate('/confirmation', { state: { booking: slot } });
  };

  if (loading) {
    return <div className="p-8 text-center">Loading slots…</div>;
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Choose Your Slot</h1>
      {slots.length === 0 ? (
        <p>No slots available right now.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {slots.map((slot) => (
            <div key={slot.id} className="border rounded-xl p-6 flex flex-col">
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-2">{slot.slipName}</h2>
                <p>
                  {new Date(slot.date).toLocaleDateString()} at{' '}
                  {new Date(slot.time).toLocaleTimeString()}
                </p>
              </div>
              <button
                onClick={() => handleSelect(slot)}
                className="mt-4 py-2 px-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
              >
                Select Slot
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
