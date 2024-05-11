import React from 'react';
// import './App.css'; // Remove this line if not needed
// import 'tailwindcss/tailwind.css'; // Import Tailwind CSS

function Home() {
  return (
    <div className="flex flex-col min-h-screen">
    
      <div className="flex flex-col items-center justify-center h-56">
        <h2 className="text-center text-lg max-w-3/4 mb-4">Unlock the World of Words: Buy, Sell, and Trade your literary treasures with Book Breeze!</h2>
        <button className="px-4 py-2 bg-green-500 text-white rounded-lg text-lg hover:bg-green-600">Browse Our Shop</button>
      </div>
      
      <div className="flex justify-center mt-8">
        {/* Replace 'picture2.jpg' with the actual path to your image */}
        <img src="picture2.jpg" alt="s" className="w-1/2 md:w-1/3" />
      </div>
      
      <footer className="text-center mt-auto py-4 bg-gray-200">
        <p>&copy; 2024 Bookstore. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
