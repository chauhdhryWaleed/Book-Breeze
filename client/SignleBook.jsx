import React from 'react';
import { useLoaderData } from 'react-router-dom';

const SingleBook = () => {
    const data = useLoaderData();
    const { bookTitle, authorName, imageURL, category, bookDescription, bookPDFURL, price } = data;

    return (
        <div className='mt-20'>
            {/* Book Details */}
            <div className="flex flex-col md:flex-row md:space-x-4">
                <img src={imageURL} alt={bookTitle} className="md:w-1/4 md:h-auto rounded-lg shadow-lg" />
                <div className="md:w-3/4">
                    <h2 className="text-4xl font-extrabold mb-4">{bookTitle}</h2>
                    <p className="text-3xl font-bold mb-2">{authorName}</p>
                    <p className="text-lg mb-2"><strong>Category:</strong> {category}</p>
                    <p className="text-lg mb-2"><strong>Description:</strong> {bookDescription}</p>
                    <p className="text-lg mb-2"><strong>Price:</strong> ${price}</p>
                    <div className="mt-4">
                        <a href={bookPDFURL} target="_blank" rel="noopener noreferrer" className="bg-blue-500 text-white py-2 px-4 rounded-md inline-block mt-2 hover:bg-blue-600 transition duration-300">Download PDF</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingleBook;
