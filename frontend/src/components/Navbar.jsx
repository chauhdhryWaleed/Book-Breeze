import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBarsStaggered, FaBlog, FaXmark } from "react-icons/fa6"; // Import FaXmark icon

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  // Toggle menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Nav items
  const navItems = [
    { link: "Home", path: "/home" },
    { link: "About", path: "/about" },
    { link: "Contact Us", path: "/contactus" },
    { link: "Login", path: "/login" },
    { link: "Books", path: "/booklist" },
  ];

  return (
    <header className="w-full bg-white  fixed top-0 left-0 right-0 transition-all z-10 duration-300">
      <nav
        className={`py-4 lg:px-24 px-4 ${
          isSticky ? "sticky top-0 left-0 right-0 bg-green-300" : ""
        }`}
      >
        <div className="flex justify-between items-center text-base gap-8 ">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-green-700">
            <FaBlog className="inline-block" />
            BookBreeze
          </Link>

          {/* Nav items for large devices */}
          <ul className="md:flex space-x-12 hidden">
            {navItems.map(({ link, path }) => (
              <Link
                key={path}
                to={path}
                className="block text-base text-black uppercase cursor-pointer hover:text-green-700"
              >
                {link}
              </Link>
            ))}
          </ul>

          {/* Button for lg devices */}
          <div className="space-x-12 hidden lg:flex items-center">
            {/* Conditional rendering based on isMenuOpen */}
            {isMenuOpen && (
              <button>
                <FaBarsStaggered className="w-5 hover:text-green-700" />
              </button>
            )}
          </div>

          {/* Menu button for mobile devices hidden for large medium devices */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-black focus:outline-none"
            >
              {isMenuOpen ? (
                <FaXmark className="h-5 w-5 text-black" />
              ) : (
                <FaBarsStaggered className="h-5 w-5 text-black" />
              )}
            </button>
          </div>
        </div>

        {/* Small menu containing all page links */}
        <div
          className={`space-y-4 px-4 mt-16 py-7 z-10 bg-green-700 ${
            isMenuOpen ? "block fixed top-0 right-0 left-0" : "hidden"
          }`}
        >
          {navItems.map(({ link, path }) => (
            <Link
              key={path}
              to={path}
              className="block text-base text-black uppercase cursor-pointer hover:text-green-700"
            >
              {link}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
