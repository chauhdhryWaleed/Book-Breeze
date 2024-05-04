import React, { useState } from "react";
import axios from "axios"; // Import axios
import { Link } from "react-router-dom";
function AddBookForm() {
  const [formData, setFormData] = useState({
    name: "",
    author: "",
    price: 0,
    category: "Select category",
    description: "",
    // avatar: null // Added avatar field to store uploaded file
    imgurl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // const handleFileChange = (e) => {
  //   setFormData({ ...formData, avatar: e.target.files[0] });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to the backend with form data
      const response = await axios.post(
        "http://localhost:3000/upload-book",
        formData
      );
      console.log(response.data); // Log response from the server
    } catch (error) {
      console.error("Error uploading book:", error);
    }
  };
  return (
    <section>
      <div className="container  border-2 bg-emerald-50">
        <div className="py-8 px-4 my-6 border-2     bg-white shadow-emerald-500 opacity-75 shadow-xl align-middle mx-auto max-w-2xl rounded-lg  lg:py-16">
          <div className="flex flex-row justify-between">
            <h2 className="mb-4 text-xl font-bold text-teal-500 dark:text-white">
              Add a new Book
            </h2>
            <span>
              <button className="py-2">
                <lord-icon
                  src="https://cdn.lordicon.com/zxvuvcnc.json"
                  trigger="hover"
                ></lord-icon>
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
                  Book Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="off"
                  value={formData.name}
                  onChange={handleChange}
                  className=" border border-gray-300 bg-gray-50 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type book name"
                  required
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="author"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Author
                </label>
                <input
                  type="text"
                  name="author"
                  id="author"
                  autoComplete="off"
                  value={formData.author}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Product brand"
                  required
                />
              </div>
              {/* <div className="w-full">
              <label
                htmlFor="isbn"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                ISBN 
              </label>
              <input
                type="number"
                name="isbn"
                id="isbn"
                value={formData.isbn}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Product brand"
                required
                />
            </div> */}
              <div>
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Genre
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option>Select genre</option>
                  <option value="TV">fiction</option>
                  <option value="PC">classic</option>
                  <option value="GA">historic</option>
                  <option value="PH">romantic</option>
                </select>
              </div>

              <div className="w-full">
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="$2999"
                  required
                />
              </div>
              {/* /* <div>
              <label
                htmlFor="user_avatar"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                Upload book image
              </label>
              <input
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                aria-describedby="user_avatar_help"
                id="user_avatar"
                type="file"
                onChange={handleFileChange}
                /> 
                            </div> */}
              <div className="w-full">
                <label
                  htmlFor="imgurl"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Image URL
                </label>
                <input
                  type="text"
                  name="imgurl"
                  id="imgurl"
                  value={formData.imgurl}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Image url"
                  required
                />
              </div>
       

              <div className="sm:col-span-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="8"
                  value={formData.description}
                  onChange={handleChange}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Your description here"
                ></textarea>
              </div>
            </div>
            <div className="flex justify-center  ">

            <button 
              type="submit"
              className="w-48  items-center  py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-green-500 bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
              >
              Add product
            </button>
              </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default AddBookForm;
