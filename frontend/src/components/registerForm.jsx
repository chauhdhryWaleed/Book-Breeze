import React, { useState } from "react";
import axios from "axios"; // Import axios
import { Link } from "react-router-dom";

function SignUpForm() {
  const [formData, setFormData] = useState({
    email: "",
    password:"",
    name: "",
    phone: "",
    dob: "",
    address: "",
    
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
    const [isHidden, setIsHidden] = useState(true);  
  

    
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue =  value; 
    setFormData((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };



   const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Set isSubmitting to true when the form is submitting
    try {
      // Send a POST request to the backend with form data
      console.log(formData)
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",formData,{  params: formData,});
      console.log(response.data); // Log response from the server
      setTimeout(() => {
        setIsSubmitting(false);
        setIsHidden(false) // Enable the button after 2 seconds
      }, 2000);
    } catch (error) {
      console.error("Error registering:", error);
      setIsSubmitting(false); // Ensure the button is enabled in case of an error
    }
  };
  return (
    



    <section className="section my-20 ">

      <div className="container z-1 border-2 bg-emerald-100">
        <div className="py-8 px-4 my-20 border-2 z-1    bg-white shadow-emerald-500 opacity-90  shadow-xl align-middle mx-auto max-w-2xl rounded-lg  lg:py-16">
          {!isHidden && <div className=" px-2 py-1 text-black bg-green-300 "> registered successfully</div>}
          <div className="flex flex-row justify-between">
            <h2 className="mb-4 text-xl font-bold text-lime-800 dark:text-white">
              Register Yourself
            </h2>
            <span>
              <button >
                <Link to="/login" >
                <lord-icon
                  src="https://cdn.lordicon.com/zxvuvcnc.json"
                  trigger="hover"
                  ></lord-icon>
                  </Link>
              </button>
            </span>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-black  dark:text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="off"
                  value={formData.name}
                  onChange={handleChange}
                  className=" border border-gray-300 bg-gray-50 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Your name"
                  required
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  autoComplete="off"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="email"
                  
                  required
                  />
              </div>
              <div className="w-full">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="off"
                  value={formData.password}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="password"
                  
                  required
                  />
              </div>
             
              <div className="w-full">
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Phone No:
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="1212-3456789"
                  autoComplete="off"
                  required
                  />
              </div>
            
              <div className="w-full">
                <label
                  htmlFor="dob"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                 Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  id="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Date of Birth"
                  required
                  />
              </div>
       

              <div className="sm:col-span-2">
                <label
                  htmlFor="address"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  rows="8"
                  value={formData.address}
                  onChange={handleChange}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Your address here"
                  ></textarea>
              </div>
            </div>
            <div className="flex justify-center  ">

            <button 
              type="submit"
              disabled={isSubmitting} // Disable the button when isSubmitting is true
              className="w-48  items-center  py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600  to-cyan-600 bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
              >
              Register
            </button>
              </div>
          </form>
        </div>
      </div>
    </section>
             
                
  );
}

export default SignUpForm;
