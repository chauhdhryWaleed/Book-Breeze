import React, { useState } from "react";
import axios from "axios"; // Import axios
import { Link } from "react-router-dom";
// import ShoppingCart from "./cart"

function AddBookForm() {
  const [formData, setFormData] = useState({
    bookTitle: "",
    authorName: "",
    imageURL: "",
    category: "Select category",
    bookDescription: "",
    price: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
    const [isHidden, setIsHidden] = useState(true);  
  

    const toggleVisibility = () => {
      setIsHidden(!isHidden);
    };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === 'price' ? parseFloat(value) : value; // Convert price to a number if the field name is 'price'
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
      const response = await axios.post(
        "http://localhost:3000/upload-book",
        formData
      );
      console.log(response.data); // Log response from the server
      setTimeout(() => {
        setIsSubmitting(false);
        setIsHidden(false) // Enable the button after 2 seconds
      }, 2000);
    } catch (error) {
      console.error("Error uploading book:", error);
      setIsSubmitting(false); // Ensure the button is enabled in case of an error
    }
  };
  return (
    // <Router>
    //        <Routes>
    //        <Route path="/cart" element={<ShoppingCart />} />

    //        </Routes>

    <section>

      <div className="container  border-2 bg-emerald-50">
        <div className="py-8 px-4 my-6 border-2     bg-white shadow-emerald-500 opacity-75 shadow-xl align-middle mx-auto max-w-2xl rounded-lg  lg:py-16">
          {!isHidden && <div className=" px-2 py-1 bg-green-300 "> book added successfully</div>}
          <div className="flex flex-row justify-between">
            <h2 className="mb-4 text-xl font-bold text-teal-500 dark:text-white">
              Upload Book
            </h2>
            <span>
              <button >
                <Link to="/cart" >
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
                  htmlFor="bookTitle"
                  className="block mb-2 text-sm font-medium text-black  dark:text-white"
                >
                  Book Name
                </label>
                <input
                  type="text"
                  name="bookTitle"
                  id="bookTitle"
                  autoComplete="off"
                  value={formData.bookTitle}
                  onChange={handleChange}
                  className=" border border-gray-300 bg-gray-50 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type book name"
                  required
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="authorName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Author
                </label>
                <input
                  type="text"
                  name="authorName"
                  id="authorName"
                  autoComplete="off"
                  value={formData.authorName}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Author Name"
                  required
                />
              </div>
              
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
                  <option value="fiction">fiction</option>
                  <option value="classic">classic</option>
                  <option value="historic">historic</option>
                  <option value="romantic">romantic</option>
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
            
              <div className="w-full">
                <label
                  htmlFor="imageURL"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Image URL
                </label>
                <input
                  type="text"
                  name="imageURL"
                  id="imgurl"
                  value={formData.imageURL}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Image url"
                  required
                />
              </div>
       

              <div className="sm:col-span-2">
                <label
                  htmlFor="bookDescription"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="bookDescription"
                  rows="8"
                  value={formData.bookDescription}
                  onChange={handleChange}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Your description here"
                ></textarea>
              </div>
            </div>
            <div className="flex justify-center  ">

            <button 
              type="submit"
              disabled={isSubmitting} // Disable the button when isSubmitting is true
              className="w-48  items-center  py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-green-500 bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
              >
              Add product
            </button>
              </div>
          </form>
        </div>
      </div>
    </section>
                  // </Router>
  );
}

export default AddBookForm;
