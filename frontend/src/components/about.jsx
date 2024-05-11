import React from 'react';
import Footer from './footer'
function MainContent() {
  return (
    <main className="px-8 py-12 text-center mt-16"> {/* Added mt-16 for top margin */}
      <h1 className="text-4xl font-bold mb-6">About Us</h1>
      <p className="max-w-3xl mx-auto text-lg text-gray-800 leading-relaxed">
        Welcome to Book Breeze, your ultimate destination for literary exploration and discovery. Here at Book Breeze, we're more than just a bookstore – we're a passionate community of readers, writers, and book enthusiasts dedicated to bringing the magic of literature to life.

        Our mission is simple: to provide you with an unparalleled reading experience, curated with care and crafted with love. Whether you're searching for the latest bestseller, a timeless classic, or a hidden gem waiting to be unearthed, you'll find it all within our extensive collection.

        Immerse yourself in a world of captivating narratives, thought-provoking ideas, and endless possibilities. From gripping thrillers to heartwarming romance, from insightful non-fiction to imaginative fantasy, there's something for every reader to enjoy.

        But Book Breeze is more than just a place to find your next favorite book – it's a community hub where book lovers can come together to share their passion, exchange recommendations, and connect with fellow bibliophiles. Join us for book clubs, author events, and lively discussions as we celebrate the power of storytelling to inspire, educate, and entertain.

        So come on in, browse our shelves, and let the pages of a good book whisk you away on an unforgettable journey. At Book Breeze, the adventure begins with every turn of the page.
      </p>
    </main>
  );
}

function AboutUsPage() {
  return (
    <div className="flex flex-col min-h-screen">

      <MainContent />
      <Footer />
     
    </div>
  );
}

export default AboutUsPage;
