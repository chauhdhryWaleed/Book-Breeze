import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaBlog, FaTimes } from "react-icons/fa"; // Import FaTimes icon

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
    <header className="w-full bg-white fixed top-0 left-0 right-0 transition-all z-10 duration-300">
      <nav
        className={`py-4 lg:px-24 px-4 ${
          isSticky ? "sticky top-0 left-0 right-0 bg-green-300" : ""
        }`}
      >
        <div className="flex justify-between items-center text-base gap-8 ">
          {/* Logo */}
          <Link to="/home" className="text-2xl font-bold text-green-700">
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
            {isMenuOpen ? (
              <button onClick={toggleMenu}>
                <FaTimes className="w-5 hover:text-green-700" />
              </button>
            ) : (
              <button onClick={toggleMenu}>
                <FaBars className="w-5 hover:text-green-500" />
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
                <FaTimes className="h-5 w-5 text-black" />
              ) : (
                <FaBars className="h-5 w-5 text-black" />
              )}
            </button>
          </div>
        </div>

        {/* Small menu containing all page links */}
        <div
          className={`${
            isMenuOpen
              ? "fixed top-0 right-0 h-auto bg-emerald-500 rounded-lg overflow-auto"
              : "hidden"
          }`}
          style={{ maxHeight: "70vh", maxWidth: "80vw" }} // Increase maxWidth
        >
          <div className="space-y-4 px-4 mt-16 py-7 z-10">
            {navItems.map(({ link, path }) => (
              <Link
                key={path}
                to={path}
                className="block text-base text-black uppercase cursor-pointer hover:text-white-700"
              >
                {link}
              </Link>
            ))}
          </div>
          <button className="absolute top-2 right-2" onClick={toggleMenu}>
            <FaTimes className="w-5 h-5 text-white" />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
