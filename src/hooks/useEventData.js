import { useState, useEffect } from 'react';

const initialZones = [
  { id: 'z1', name: 'North Gate', density: 'high', label: 'Entrance', hasFireExit: true, hasFirstAid: false },
  { id: 'z2', name: 'East Concourse', density: 'medium', label: 'Food Court', hasFireExit: true, hasFirstAid: true },
  { id: 'z3', name: 'South Gate', density: 'low', label: 'Exit', hasFireExit: true, hasFirstAid: false },
  { id: 'z4', name: 'West Concourse', density: 'low', label: 'Restrooms', hasFireExit: true, hasFirstAid: false },
  { id: 'z5', name: 'Main Arena', density: 'medium', label: 'Seating', hasFireExit: false, hasFirstAid: false },
  { id: 'z6', name: 'VIP Lounge', density: 'low', label: 'VIP', hasFireExit: true, hasFirstAid: true },
];

const initialQueues = [
  { id: 'q1', name: 'Burger Stand 1', type: 'food', waitTime: 12 },
  { id: 'q2', name: 'Pizza Corner', type: 'food', waitTime: 25 },
  { id: 'q3', name: 'North Restrooms', type: 'restroom', waitTime: 5 },
  { id: 'q4', name: 'South Restrooms', type: 'restroom', waitTime: 2 },
  { id: 'q5', name: 'Beer Garden', type: 'drink', waitTime: 18 },
];

const initialParking = [
  { id: 'p1', name: 'North Lot', type: 'General', capacity: 1000, current: 850 },
  { id: 'p2', name: 'East Lot', type: 'VIP', capacity: 200, current: 195 },
  { id: 'p3', name: 'South Garage', type: 'General', capacity: 1500, current: 400 },
];

export function useEventData() {
  const [zones, setZones] = useState(initialZones);
  const [queues, setQueues] = useState(initialQueues);
  const [parking, setParking] = useState(initialParking);

  useEffect(() => {
    // Simulate real-time data updates every 5 seconds
    const interval = setInterval(() => {
      setZones((prevZones) =>
        prevZones.map((zone) => {
          const densities = ['low', 'medium', 'high'];
          // 20% chance to change density
          if (Math.random() > 0.8) {
            const randomDensity = densities[Math.floor(Math.random() * densities.length)];
            return { ...zone, density: randomDensity };
          }
          return zone;
        })
      );

      setQueues((prevQueues) =>
        prevQueues.map((queue) => {
          // Change wait time by -3 to +3 minutes, bounded between 0 and 45
          const change = Math.floor(Math.random() * 7) - 3;
          const newWaitTime = Math.max(0, Math.min(45, queue.waitTime + change));
          return { ...queue, waitTime: newWaitTime };
        })
      );
      
      setParking((prevParking) => 
        prevParking.map((lot) => {
          // Cars enter/leave
          const change = Math.floor(Math.random() * 21) - 10;
          const newCurrent = Math.max(0, Math.min(lot.capacity, lot.current + change));
          return { ...lot, current: newCurrent };
        })
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return { zones, queues, parking };
}
