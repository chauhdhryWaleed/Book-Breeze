import React, { useContext, useEffect, useState } from 'react';
import { Card, Spinner } from 'flowbite-react';
import { AuthContext } from '../../contexts/AuthProvider';
import { Link } from 'react-router-dom';

export default function Shop() {
  const { loading } = useContext(AuthContext);
  const [books, setBooks] = useState([]);

  // Fetching data
  useEffect(() =>{
    fetch('http://localhost:5000/all-books')
    .then(res => res.json())
    .then(data => setBooks(data))
  }, [loading]);

  // Loader
  if (loading) {
    return (
      <div className="text-center mt-28">
        <Spinner aria-label="Center-aligned spinner example" />
      </div>
    );
  }

  // Function to toggle showing full book description
  const toggleShowMore = (index) => {
    const updatedBooks = [...books];
    updatedBooks[index].showFullDescription = !updatedBooks[index].showFullDescription;
    setBooks(updatedBooks);
  };

  return (
    <div className='my-28 px-4 lg:px-24'>
      <h2 className='text-3xl font-bold text-center mb-16 z-40'>All Books are Available Here</h2>
      <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8'>
        {books.map((book, index) => (
          <Card key={book._id}>
            <img src={book.imageURL} alt="" className='h-96' />
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {book.bookTitle}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {book.showFullDescription ? book.bookDescription : `${book.bookDescription.slice(0, Math.floor(book.bookDescription.length * 0.3))}...`}
              {!book.showFullDescription && book.bookDescription.length > Math.floor(book.bookDescription.length * 0.3) &&
                <span className='text-blue-600 cursor-pointer mt-2' onClick={() => toggleShowMore(index)}>
                  Show More
                </span>
              }
              {book.showFullDescription &&
                <span className='text-blue-600 cursor-pointer mt-2' onClick={() => toggleShowMore(index)}>
                  Show Less
                </span>
              }
            </p>
            <Link to={`/book/${book._id}`} className='px-4 py-2 bg-blue-600 text-white rounded mt-2 block'>
              Open
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
