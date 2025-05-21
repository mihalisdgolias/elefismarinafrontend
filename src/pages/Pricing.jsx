import React from 'react';

export default function Pricing() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Pricing Plans</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { name: 'Basic', price: '$99/mo', features: ['One berth', '24h support'] },
          { name: 'Pro', price: '$199/mo', features: ['Two berths', 'Priority support'] },
          { name: 'Enterprise', price: '$299/mo', features: ['Unlimited berths', 'Dedicated manager'] },
        ].map(plan => (
          <div key={plan.name} className="border rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">{plan.name}</h2>
            <p className="text-4xl font-bold mb-4">{plan.price}</p>
            <ul className="mb-6 space-y-2">
              {plan.features.map(f => (
                <li key={f} className="flex items-center">
                  <span className="material-icons mr-2 text-green-500">check</span>
                  {f}
                </li>
              ))}
            </ul>
            <button className="w-full py-2 bg-green-600 text-white rounded-xl hover:bg-green-700">
              Select
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
