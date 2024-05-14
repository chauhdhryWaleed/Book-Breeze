import React from 'react';
import { FaBook, FaGlobe, FaShoppingCart } from 'react-icons/fa'; // Importing Font Awesome icons
import Footer from './footer';
import characterImage from './character.jpg';
import { Link } from 'react-router-dom';
function VerticalLayout() {
  return (
    // flex container, allowing its children to be laid out in a flexbox layout.
    //flex-col: This class specifies a flex direction of column, meaning its children will be stacked vertically.
    <div className="flex flex-col min-h-screen">
     

      {/* Main content */}
      <div className="flex-grow flex">
        {/* Left column */}
        <div className="w-1/2 flex flex-col justify-center items-center p-10">
          <div className="text-center">
            <FaBook className="text-5xl text-green-600 mb-4" />
            <h1 className="text-3xl font-bold text-green-800 mb-6">Explore worlds, expand minds, through books.</h1>
            <h2 className="text-lg font-semibold text-gray-700 mb-6">Unlock the World of Words: Buy, Sell, and Trade your literary treasures with Book Breeze!</h2>
           
           
            <Link to="/booklist" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded">Browse Shop</Link>
          </div>
        </div>

        {/* Right column */}
        <div className="w-1/2 flex justify-center items-center">
          <img src={characterImage} alt="Character" className="max-w-lg" />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default VerticalLayout;
