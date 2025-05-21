import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Booking() {
  const [slots, setSlots] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('token');

    const start = new Date(`${startDate}T${startTime}`);
    const end = new Date(`${endDate}T${endTime}`);

    if (start >= end) {
      alert('❌ Start date and time must be before end date and time.');
      setLoading(false);
      return;
    }

    const diffHours = (end - start) / (1000 * 60 * 60);
    if (diffHours < 12) {
      alert('⏱️ Reservation must be at least 12 hours long.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('${import.meta.env.VITE_API_BASE}/api/booking/available', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          start_date: startDate,
          start_time: startTime,
          end_date: endDate,
          end_time: endTime,
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error('Server error:', res.status, errText);
        alert(`Server error ${res.status}`);
        setSlots([]);
        return;
      }

      const data = await res.json();
      if (!Array.isArray(data)) throw new Error('Invalid response format');
      setSlots(data);
    } catch (err) {
      console.error('Error fetching slots:', err);
      alert('Error fetching slots. See console for details.');
      setSlots([]);
    } finally {
      setLoading(false);
    }
  };

  const handleBook = async (slotId) => {
    const token = localStorage.getItem('token');

    try {
      const res = await fetch('${import.meta.env.VITE_API_BASE}/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          slot_id: slotId,
          start_date: startDate,
          end_date: endDate,
          start_time: startTime,
          end_time: endTime,
          email: email || undefined,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        navigate('/confirmation', {
          state: {
            slot: slotId,
            startDate,
            endDate,
            startTime,
            endTime,
            totalPrice: data.total_price,
          },
        });
      } else {
        const err = await res.json();
        alert(`❌ Booking failed: ${err.message}`);
      }
    } catch (err) {
      console.error('Booking error:', err);
      alert('Network error while booking.');
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Make a Booking</h1>

      <form onSubmit={handleSearch} className="space-y-4 mb-8">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Start Date</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Start Time</label>
            <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">End Date</label>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">End Time</label>
            <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded p-2" />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Send confirmation to (optional email)</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              className="mt-1 block w-full border border-gray-300 rounded p-2"
            />
          </div>
        </div>

        <button type="submit" className="w-full py-2 px-4 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
          {loading ? 'Searching...' : 'Find Available Slots'}
        </button>
      </form>

      {slots.length === 0 ? (
        <p className="text-center text-gray-500">No slots available for the selected time range.</p>
      ) : (
        <ul className="space-y-4">
          {slots.map((slot) => (
            <li key={slot.id} className="p-4 border rounded-lg flex justify-between items-center">
              <div>
                <p className="font-semibold">{slot.name || `Slot ${slot.id}`}</p>
                <p className="text-sm text-gray-600">Price: ${slot.price}</p>
              </div>
              <button onClick={() => handleBook(slot.id)} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                Book
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
