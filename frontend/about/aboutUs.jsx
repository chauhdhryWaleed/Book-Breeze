import React from 'react';

function Header() {
  return (
    <header className="bg-white text-green-600 px-20 py-20 flex justify-between items-center">
      <h1 className="text-3xl font-semibold font-sans">BookBreeze</h1>
      <nav>
        <ul className="flex">
          <li className="mr-4">
            <button className="text-green-600 font-semibold text-base hover:text-green-700 transition duration-300">Home</button>
          </li>
          <li className="mr-4">
            <button className="text-green-600 font-semibold text-base hover:text-green-700 transition duration-300">Books</button>
          </li>
          <li className="mr-4">
            <button className="text-green-600 font-semibold text-base hover:text-green-700 transition duration-300">About Us</button>
          </li>
          <li className="mr-4">
            <button className="text-green-600 font-semibold text-base hover:text-green-700 transition duration-300">Contact</button>
          </li>
          <li>
            <button className="text-green-600 font-semibold text-base my-cart hover:text-green-700 transition duration-300">My Cart</button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

function MainContent() {
  return (
    <main className="px-20 py-20 text-center">
      <h1 className="text-3xl font-semibold">About Us</h1>
      <p className="max-w-2xl mx-auto mt-4 text-sm text-gray-700">
        Welcome to our about us page. We are a team of passionate individuals dedicated to providing high-quality products/services to our customers. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eget leo vel ante gravida accumsan. Aliquam erat volutpat. Sed quis libero vel magna dictum eleifend vel at quam. Nulla facilisi. Nullam nec turpis nec mi eleifend placerat. Duis vel nisi magna. Morbi eu nisl id sapien congue euismod. Integer quis tempus orci, auctor feugiat ex. Suspendisse potenti. Fusce ultricies magna non enim faucibus, eget eleifend purus suscipit. Integer auctor faucibus odio ac tristique. Aliquam aliquam diam nec convallis finibus.
      </p>
    </main>
  );
}

function AboutUsPage() {
  return (
    <div>
      <Header />
      <MainContent />
    </div>
  );
}

export default AboutUsPage;
