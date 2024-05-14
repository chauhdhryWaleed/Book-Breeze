import React from 'react';
import { FaBook, FaComments, FaUsers } from 'react-icons/fa'; // Importing Font Awesome icons
import Footer from './footer'; // Assuming Footer component is defined in 'Footer.js'

function MainContent() {
  return (
    <main className="px-8 py-12 text-center mt-16 max-w-3xl mx-auto">
      <div className="text-left mb-8">
        <h1 className="text-4xl font-bold mb-6">About Us</h1>
        <p className="text-lg text-gray-800 leading-relaxed">
          Welcome to <span className="text-green-500 font-bold">Book Breeze</span>, your ultimate destination for literary exploration and discovery. Here at Book Breeze, we're more than just a bookstore – we're a passionate community of readers, writers, and book enthusiasts dedicated to bringing the magic of literature to life.
        </p>
        <p className="text-lg text-gray-800 leading-relaxed">
          Our mission is simple: to provide you with an unparalleled reading experience, curated with care and crafted with love. Whether you're searching for the latest bestseller, a timeless classic, or a hidden gem waiting to be unearthed, you'll find it all within our extensive collection.
        </p>
        <p className="text-lg text-gray-800 leading-relaxed">
          Immerse yourself in a world of captivating narratives, thought-provoking ideas, and endless possibilities. From gripping thrillers to heartwarming romance, from insightful non-fiction to imaginative fantasy, there's something for every reader to enjoy.
        </p>
        <p className="text-lg text-gray-800 leading-relaxed">
          But Book Breeze is more than just a place to find your next favorite book – it's a community hub where book lovers can come together to share their passion, exchange recommendations, and connect with fellow bibliophiles. Join us for book clubs, author events, and lively discussions.
        </p>
        <p className="text-lg text-gray-800 leading-relaxed">
          So come on in, browse our shelves, and let the pages of a good book whisk you away on an unforgettable journey. At <span className="text-green-500 font-bold">Book Breeze</span>, the adventure begins with every turn of the page.
        </p>
        <div className="flex justify-center mt-8">
          <div className="mx-4">
            <FaBook className="text-green-500 text-4xl mb-2" />
            <p className="text-lg text-gray-800">Wide Selection</p>
          </div>
          <div className="mx-4">
            <FaComments className="text-green-500 text-4xl mb-2" />
            <p className="text-lg text-gray-800">Community</p>
          </div>
          <div className="mx-4">
            <FaUsers className="text-green-500 text-4xl mb-2" />
            <p className="text-lg text-gray-800">Diverse Readers</p>
          </div>
        </div>
      </div>
    </main>
  );
}

function AboutUsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <MainContent />
      </div>
      <Footer />
    </div>
  );
}

export default AboutUsPage;
