// App.js
// import catImage from './images/cat.jpg'
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <h1 className="book-breeze">Book Breeze</h1>
        <nav>
          <ul className="nav-links">
            <li><button>Home</button></li>
            <li><button>Books</button></li>
            <li><button>About Us</button></li>
            <li><button>Contact</button></li>
            <li><button className="my-cart">My Cart</button></li>
          </ul>
        </nav>
      </header>
      <div className="center-content">
        <h2 className="quote">Unlock the World of Words: Buy, Sell, and Trade your literary treasures with Book Breeze!</h2>
        <button className="browse-button">Browse Our Shop</button>
      </div>
      
      <div className="display-pictures">
        <img src={catImage} alt="cat " className="picture" />
        <img src="picture2.jpg" alt="s" className="picture" />
      </div>
      
      
      <footer>
        <p>&copy; 2024 Bookstore. All rights reserved.</p>
      </footer>
    </div>
  );
}

// function BookList() {
//   const books = [
//     {
//       id: 1,
//       title: "Book Title 1",
//       author: "Author Name",
//       price: "$10.99",
//       image: "book1.jpg"
//     },
//     {
//       id: 2,
//       title: "Book Title 2",
//       author: "Author Name",
//       price: "$12.99",
//       image: "book2.jpg"
//     }
//     // Add more book objects as needed
//   ];

//   return (
//     <section className="book-list">
//       {books.map(book => (
//         <div className="book" key={book.id}>
//           <img src={book.image} alt={book.title} />
//           <h2>{book.title}</h2>
//           <p>Author: {book.author}</p>
//           <p>Price: {book.price}</p>
//           <button>Add to Cart</button>
//         </div>
//       ))}
//     </section>
//   );
// }

export default App;
