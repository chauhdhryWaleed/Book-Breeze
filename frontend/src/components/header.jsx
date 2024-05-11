import React from 'react';


const Header =()=>{
  return (
  
    <header>
        <nav className='py-2 flex justify-between items-center bg-white text-green-900'>
          <div className="logo">
            <span className='font-bold text-2xl text-x1 mx-8'>BookBreeze</span>
          </div>
          <ul className="flex items-center gap-6 mx-8 ">
            <li className='text-green-500 cursor-pointer hover:font-bold transition-all hover:border-b-2 border-green-700 '> <a href="home.html"></a> Home</li>
            <li className='text-green-500 cursor-pointer hover:font-bold transition-all hover:border-b-2 border-green-700'> <a href="store.html"></a>Books</li>
            <li className='text-green-500 cursor-pointer hover:font-bold transition-all hover:border-b-2 border-green-700'> <a href="about.html"></a>About Us</li>
            <li className='text-green-500 cursor-pointer hover:font-bold transition-all hover:border-b-2 border-green-700'> <a href="contact.html"></a>Contact</li>
            <li className='text-white cursor-pointer hover:font-bold transition-all '><button className=" py-3 px-6 border border-black rounded-lg bg-black">My Cart</button></li>
          </ul>
        </nav>
      </header>
    

  );

};
export default Header;