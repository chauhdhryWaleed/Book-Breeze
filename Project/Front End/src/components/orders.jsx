import React, { useState, useEffect } from 'react';
import axios from 'axios';

function OrdersPage() {
  const [email, setEmail] = useState('');
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  const fetchOrdersByEmail = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/orders/orders_by_email?email=${email}`);
      setOrders(response.data);
      setError('');
    } catch (error) {
      setOrders([]);
      setError('Error fetching orders');
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    if (email !== '') {
      // Fetch orders when the email changes and is not empty
      fetchOrdersByEmail();
    }
  }, [email]); // Run effect only when the email state variable changes

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Fetch orders when the form is submitted
    fetchOrdersByEmail();
  };

  return (
    <div style={{ marginTop: '20px', padding: '0 20px' }}>
      <h1>User Orders</h1>
      <div style={{ marginTop: '20px' }}>
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input type="email" value={email} onChange={handleChange} required />
          </label>
          <button type="submit" style={{ marginLeft: '10px', padding: '5px 10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Fetch Orders</button>
        </form>
        {error && <p>{error}</p>}
        <div>
          {orders.length > 0 ? (
            <ul>
              {orders.map((order) => (
                <li key={order._id}>
                  <p>Order ID: {order._id}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No orders found for this email</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrdersPage;
