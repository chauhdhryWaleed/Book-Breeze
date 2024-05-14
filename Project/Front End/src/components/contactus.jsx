import React, { useState } from 'react';
import { FiUser, FiMail, FiMessageCircle } from 'react-icons/fi';
import Footer from './footer';
const Contactus = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,// spread operator (...prevState) to copy all the existing key-value pairs from the previous state.
      [name]: value //add new key-value pair to the new state object. The name variable is used as the key, and valu is used as the value.
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();//ensures that the form submission doesn't trigger a page reload
    
    console.log(formData);
    // Reset form fields
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto mt-20 flex-grow"> {/* flex-grow to expand content to fill remaining space */}
        <h1 className="text-green text-3xl font-bold mb-8 text-center">Contact Us</h1>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
          <div className="mb-4 flex items-center">
            <FiUser className="text-green-500 mr-3 h-8 w-8" />
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border-b-2 border-green-500 py-2 px-3 focus:outline-none focus:border-green-600"
              placeholder="Your name"
              required
            />
          </div>
          <div className="mb-4 flex items-center">
            <FiMail className="text-green-500 mr-3 h-8 w-8" />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border-b-2 border-green-500 py-2 px-3 focus:outline-none focus:border-green-600"
              placeholder="Your email"
              required
            />
          </div>
          <div className="mb-4 flex items-center">
            <FiMessageCircle className="text-green-500 mr-3 h-8 w-8" />
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              className="w-full border-b-2 border-green-500 py-2 px-3 focus:outline-none focus:border-green-600"
              placeholder="Your message"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 w-full"
          >
            Submit
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Contactus;
