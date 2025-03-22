import React, { useState, useEffect } from 'react';
import { FaClock, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export const MyOrder = () => {
  const navigate = useNavigate();
  const [time, setTime] = useState(0); // Time in seconds
  const [isRunning, setIsRunning] = useState(true);
  const [orders, setOrders] = useState([]);

  // Clock position state
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [direction, setDirection] = useState({ dx: 3, dy: 3 });

  // Load orders and start time from localStorage when component mounts
  useEffect(() => {
    const storedOrders = localStorage.getItem("orders");
    const storedStartTime = localStorage.getItem("orderStartTime");

    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }

    if (storedStartTime) {
      const startTime = parseInt(storedStartTime, 10);
      const currentTime = Date.now();
      const elapsedTime = Math.floor((currentTime - startTime) / 1000); // Convert to seconds
      setTime(elapsedTime); // Set the initial time
    }
  }, []);

  // Timer logic
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  // Bouncing Clock Animation
  useEffect(() => {
    const moveClock = () => {
      setPosition((prev) => {
        let newX = prev.x + direction.dx;
        let newY = prev.y + direction.dy;

        // Screen boundaries
        const maxX = window.innerWidth - 80; // Adjusting for icon size
        const maxY = window.innerHeight - 80;

        let newDx = direction.dx;
        let newDy = direction.dy;

        if (newX <= 0 || newX >= maxX) newDx = -newDx; // Bounce horizontally
        if (newY <= 0 || newY >= maxY) newDy = -newDy; // Bounce vertically

        setDirection({ dx: newDx, dy: newDy });

        return { x: newX, y: newY };
      });
    };

    const clockInterval = setInterval(moveClock, 20);
    return () => clearInterval(clockInterval);
  }, [direction]);

  // Format time into HH:MM:SS
  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen relative overflow-hidden">
      {/* Back Button */}
      <button
        className="absolute top-6 left-6 flex items-center text-blue-500 text-lg font-semibold hover:underline"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft className="mr-2" /> Back
      </button>

      {/* Bouncing Clock Icon */}
      <div
        className="absolute text-8xl text-blue-500 drop-shadow-lg"
        style={{
          top: `${position.y}px`,
          left: `${position.x}px`,
          transition: 'top 20ms linear, left 20ms linear',
        }}
      >
        <FaClock />
      </div>

      {/* Counting Timer */}
      <div className="text-center text-4xl font-bold mt-32 mb-8">
        {formatTime(time)}
      </div>

      {/* Order List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Your Orders</h2>
        <ul>
          {orders.map((order) => (
            <li key={order.id} className="border-b py-3 last:border-b-0">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <img
                    src={order.food.image}
                    alt={order.food.name}
                    className="w-16 h-16 rounded-lg object-cover mr-4"
                  />
                  <div>
                    <span className="text-lg font-semibold">{order.food.name}</span>
                    <p className="text-gray-600">{order.food.description}</p>
                    <p className="text-gray-600">Quantity: {order.quantity}</p>
                    <p className="text-gray-600">Price: ${order.food.price}</p>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    order.order_status === 'Accepted'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {order.order_status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};