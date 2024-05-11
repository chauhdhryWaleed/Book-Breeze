import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../public/register.css";

function LoginPage() {
  const navigate = useNavigate();
  const [resp, setResp] = useState("");
  const [respColor, setRespColor] = useState("");
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
    setIsHidden(true);
    setIsSubmitting(true);

    try {
      const response = await axios.get("http://localhost:3000/api/auth/login", {
        params: formData,
      });
      setResp(response.data.message);
      setRespColor("bg-green-300");
      setIsSubmitting(false);
      setIsHidden(false);

      setTimeout(() => {
        navigate("/adminSidebar");
      }, 1000);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        setResp(error.response.data.message);
        setRespColor("bg-red-300");

        setIsSubmitting(false);
        setIsHidden(false);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <section className="bg-white">
      <div className="logincontainer py-8 mx-auto">
        <div className="absolute inset-0 flex items-center justify-center bg-emerald-100 opacity-80">
          <div className="w-full max-w-md bg-white rounded-lg shadow">
            {!isHidden && (
              <div
                className={`px-4 py-4 mx-2 my-1 border rounded-md text-green-800 ${respColor}`}
              >
                {resp}
              </div>
            )}

            <div className="p-6 space-y-4">
              <h1 className="text-xl font-bold text-gray-900">
                Sign in to your account
              </h1>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-green-600 focus:border-green-600 p-2.5"
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
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-green-600 focus:border-green-600 p-2.5"
                    onChange={handleChange}
                    value={formData.password}
                    autoComplete="off"
                    required
                  />
                </div>
                <div className="flex items-start">
                  <div>
                    <button
                      type="submit"
                      className="w-full text-white bg-gradient-to-br from-green-500 to-green-700 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 font-medium rounded-lg text-sm pl-3 pr-3 py-2.5 text-center"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Signing in..." : "Login"}
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  Don’t have an account yet?{" "}
                  <Link
                    to="/registerForm"
                    className="font-medium text-green-600 hover:underline"
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
  );
}

export default LoginPage;
