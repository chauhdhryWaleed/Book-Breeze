import React from 'react';
import Navbar from './Navbar'; // Assuming Navbar is another component
import i from './picture.jpg';
import j from './oo.jpg';
import Footer from './footer';
function VerticalLayout() {
  return (
    <div className="flex flex-col min-h-screen relative" style={{ backgroundImage: `url(${i})`, backgroundSize: 'cover', backgroundPosition: 'center' }} >
      {/* Navbar */}

      {/* Main content */}
      <div className="flex-grow flex mt-12 relative"> {/* Added mt-4 for margin-top */}
        {/* First column */}
        <div className="w-1/2 bg-transparent p-10 relative">
          {/* Text on top of image */}
          <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-white">
            <h1 className="text-2xl font-bold text-center mb-8">Explore worlds, expand minds, through books.</h1>
            <h2 className="text-lg font-semibold text-center mb-8">Unlock the World of Words: Buy, Sell, and Trade your literary treasures with Book Breeze!</h2>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Browse Shop
            </button>
          </div>
        </div>

        {/* Second column */}
        <div className="w-1/2 bg-transparent relative">
          {/* No need for an image element */}
        </div>
      </div>

      {/* Footer */}
      <Footer/>
    </div>
  );
}

export default VerticalLayout;
