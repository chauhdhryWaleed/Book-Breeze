import React, { useState } from "react";
import axios from "axios"; // Import axios
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import SignUpForm from "./registerForm";
import { useNavigate } from "react-router-dom";
import "../../public/register.css";
function LoginPage() {
  const navigate = useNavigate();
  const [resp, setResp] = useState(""); // State variable for response message
  const [respColor, setRespColor] = useState(""); // State variable for response color
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  const [formData, setformData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    setResp("");
    setRespColor("");
    setIsHidden(true); // Enable the button after 2 seconds

    setIsSubmitting(true);
    try {
      const response = await axios.get("http://localhost:3000/api/auth/login", {
        params: formData,
      });
      console.log("Responding...............");
      console.log(response.data); // Log response from the server
      setResp(response.data.message);
      setRespColor("bg-green-300");
      setIsSubmitting(false);
      setIsHidden(false);

      // Handle successful login (e.g., redirect user to another page)
      setTimeout(() => {
        navigate("/addBook");
      }, 1000);
    } catch (error) {
      // Error occurred
      if (error.response) {
        
        // The request was made and the server responded with a status code
        // Access error response data
        console.log(error.response.data.message);
        setResp(error.response.data.message);
        setRespColor("bg-red-300");
        // Handle error response (e.g., display error message to user)

        setIsSubmitting(false);
        setIsHidden(false); // Enable the button after 2 seconds
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
      } else {
        // Something else went wrong
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <section className="bg-gray-50 relative dark:bg-gray-900">
      
          <div className=" logincontainer  py-8  mx-auto md:h-screen lg:py-0">
        <div className="  absolute px-6 flex flex-col  items-center justify-center right-0 left-0 bottom-0 top-0 bg-gray-900 opacity-80">
            <div className=" w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              {!isHidden && (
                <div
                  className={`px-4 py-2 mx-2 my-1 border rounded-md  text-emerald-800 ${respColor}`}
                >
                  {resp}
                </div>
              )}

              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
                </h1>
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <label
                      htmlFor="email"
                      aria-autocomplete="none"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                      onChange={handleChange}
                      value={formData.email}
                      autoComplete="off"
                      required
                    />
                  </div>
                  <div>
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
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={handleChange}
                      value={formData.password}
                      autoComplete="off"
                      required
                    />
                  </div>
                  <div className="  flex flex-col gap-3 items-center justify-between">
                    <div className="flex items-start">
                      <div>
                        <button
                          type="submit"
                          className="w-full  text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-20 py-2.5 text-center me-2 mb-2"
                          disabled={isSubmitting} // Disable button when submitting
                        >
                          Login
                        </button>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Don’t have an account yet?{" "}
                    <Link
                      to="/registerForm"
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Sign up
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      
    </section>

    // </Router>
  );
}

export default LoginPage;
