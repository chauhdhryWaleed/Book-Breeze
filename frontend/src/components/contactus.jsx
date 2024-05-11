import React, { useState } from 'react';
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
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add your logic here to handle form submission
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
        <h1 className="text-green text-2xl font-bold mb-5">Contact Us</h1>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
           <div className="mb-4">
          <label htmlFor="name" className=" block mb-2 ">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded py-2 px-3"
            placeholder="Your name"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className= " w-full border rounded py-2 px-3"
            placeholder="Your email"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block mb-2">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            className="w-full border rounded py-2 px-3"
            placeholder="Your message"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-600"
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
