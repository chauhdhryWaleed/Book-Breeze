import React, { useState, useEffect } from 'react';
import { FaSortAlphaDown, FaSortAlphaUp, FaShoppingCart } from 'react-icons/fa'; // Importing Font Awesome icons
import Footer from './footer';

function BookList() {
  const [books, setBooks] = useState([]);
  const [sortedBooks, setSortedBooks] = useState([]); //sets state inital of sortedbooks to []
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch('http://localhost:3000/api/books/all-books');
        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    }

    fetchBooks();
  }, []);

  // Function to handle sorting
  const handleSort = () => {
    const sorted = [...books].sort((a, b) => {  // sorting usinf sort fun defined
      if (sortOrder === 'asc') {
        return a.bookTitle.localeCompare(b.bookTitle);
      } else {
        return b.bookTitle.localeCompare(a.bookTitle);
      }
    });
    setSortedBooks(sorted);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');//handless toggling of clicks
  };

  // Function to handle search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Function to handle adding to cart
  const handleAddToCart = (bookId) => {
    // Implement functionality to add book to cart
    console.log(`Book with ID ${bookId} added to cart`);
  };

  return (
    <div>
      <div className="my-28 px-4 lg:px-24">
        <h2 className="text-3xl font-bold text-center mb-8">Book List</h2>
        <div className="flex justify-center mb-4">
          <input
            type="text"
            placeholder="Search by book name"
            className="px-4 py-2 border rounded-md mr-2"
            value={searchQuery}
            onChange={handleSearch}
          />
          <button
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md flex items-center"
            onClick={handleSort}
          >
            {sortOrder === 'asc' ? <FaSortAlphaDown className="mr-2" /> : <FaSortAlphaUp className="mr-2" />}
            Sort Alphabetically
          </button>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
          {(sortedBooks.length > 0 ? sortedBooks : books)
            .filter(book => book.bookTitle.toLowerCase().includes(searchQuery.toLowerCase()))//matches title for each book after changing in lower case returns the one that matches
            .map(book => ( //maps the books render the below code for the matched book
              <div key={book._id} className="border rounded p-4 flex flex-col shadow-lg transition-transform duration-300 transform hover:-translate-y-2">
                <div className="flex-grow">
                  <img src={book.imageURL} alt={book.bookTitle} className="h-64 w-full object-contain mb-4" />
                  <h2 className="text-xl font-semibold mb-2">{book.bookTitle}</h2>
                  <p className="text-gray-600 mb-2"><strong>Author:</strong> {book.authorName}</p>
                  <p className="text-gray-600 mb-2"><strong>Category:</strong> {book.category}</p>
                  <p className="text-gray-600 mb-2"><strong>Description:</strong> {book.bookDescription}</p>
                  <p className="text-gray-600 mb-2"><strong>Price:</strong> {book.price}</p>
                </div>
                {/* <button
                  onClick={() => handleAddToCart(book._id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 flex items-center justify-center"
                >
                  <FaShoppingCart className="mr-2" />
                  Add to Cart
                </button> */}
              </div>
            ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default BookList;
