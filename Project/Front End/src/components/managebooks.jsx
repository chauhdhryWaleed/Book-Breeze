import React, { useEffect, useState } from 'react';
import { Pagination } from 'flowbite-react';
import { Link } from 'react-router-dom';

const ManageBooks = () => {
    const [allBooks, setAllBooks] = useState([]);
    const [editBook, setEditBook] = useState(null);
    useEffect(() => {
        fetch(`http://localhost:3000/api/books/all-books`)
            .then((res) => res.json())
            .then((data) => {
                setAllBooks(data);
                console.log("books aa gai", data);
            });
    }, []);

    // delete a book
    // delete a book
const handleDelete = (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this book?");
    if (isConfirmed) {
        fetch(`http://localhost:3000/api/books/book/${id}`, {
            method: "DELETE",
        })
            .then((res) => {  //prmosie fulfilled then display
                if (res.ok) {
                    // Book deleted successfully from the server, update UI
                    setAllBooks(prevBooks => prevBooks.filter(book => book._id !== id));
                    alert("Book deleted successfully!");
                } else {
                    // Handle error response from server
                    console.error("Failed to delete book");
                }
            })
            .catch((error) => {
                // Handle network or other errors
                console.error("Error deleting book:", error);
            });
    }
};

const handleEdit = (book) => {
    // Set the book to be edited
    setEditBook(book);
};

const handleSubmitEdit = (updatedBook) => {
    const { _id, ...bookData } = updatedBook; // Exclude _id field from updatedBook

    fetch(`http://localhost:3000/api/books/book/${updatedBook._id}`, {
        method: "PATCH", // or "PATCH" depending on your server's API
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData), // Send updated data without _id
    })
        .then((res) => {
            if (res.ok) {
                // Update the book in the UI
                setAllBooks(prevBooks => //prevBooks as parameter matches ids of each book one whose matches updates its data
                    prevBooks.map(book =>
                        book._id === updatedBook._id ? updatedBook : book  //returns array containing updated data of edited book
                    )
                );
                alert("Book updated successfully!");
                setEditBook(null); // Close the edit modal
            } else {
                console.error("Failed to update book");
            }
        })
        .catch((error) => {
            console.error("Error updating book:", error);
        });
};

    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const onPageChange = (page) => setCurrentPage(page);

    return (
        <div className='px-4 my-12'>
            <h2 className='mb-8 text-3xl font-bold'>Manage Your Books Inventory!</h2>

            {/* table */}
            <div className="overflow-x-auto">
                <table className='w-full border-collapse table-auto'>
                    <thead>
                        <tr>
                            <th className="px-6 py-3 bg-gray-200 text-gray-700 border-b border-gray-300">No.</th>
                            <th className="px-6 py-3 bg-gray-200 text-gray-700 border-b border-gray-300">Book name</th>
                            <th className="px-6 py-3 bg-gray-200 text-gray-700 border-b border-gray-300">Author Name</th>
                            <th className="px-6 py-3 bg-gray-200 text-gray-700 border-b border-gray-300">Category</th>
                            <th className="px-6 py-3 bg-gray-200 text-gray-700 border-b border-gray-300">Price</th>
                            <th className="px-6 py-3 bg-gray-200 text-gray-700 border-b border-gray-300">Edit or Manage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allBooks.map((book, index) => ( //renders for all
                            <tr key={book._id} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{book.bookTitle}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{book.authorName}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{book.category}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{book.price}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                <button className='bg-green-600 px-4 py-1 font-semibold text-white rounded-sm hover:bg-sky-600' onClick={() => handleEdit(book)}>Edit</button>
                                    <button className='bg-red-600 px-4 py-1 font-semibold text-white rounded-sm hover:bg-sky-600' onClick={() => handleDelete(book._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

       
            {editBook && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            {/* Edit form component */}
                            <EditForm book={editBook} onSubmit={handleSubmitEdit} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

// Edit form component

const EditForm = ({ book, onSubmit }) => {
    const [updatedBook, setUpdatedBook] = useState(book || { bookTitle: '', authorName: '', category: '', price: 0 });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedBook(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCancelEdit = () => {
        const isConfirmed = window.confirm("Are you sure you want to cancel editing?");
        if (isConfirmed) {
            setEditBook(null); // Close the edit modal
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(updatedBook);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                {/* Form fields for editing book details */}
                <div className="mb-4">
                    <label htmlFor="bookTitle" className="block text-gray-700 text-sm font-bold mb-2">Book Title</label>
                    <input type="text" id="bookTitle" name="bookTitle" value={updatedBook.bookTitle} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-4">
                    <label htmlFor="authorName" className="block text-gray-700 text-sm font-bold mb-2">Author Name</label>
                    <input type="text" id="authorName" name="authorName" value={updatedBook.authorName} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-4">
                    <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">Category</label>
                    <input type="text" id="category" name="category" value={updatedBook.category} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-4">
                    <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">Price</label>
                    <input type="number" id="price" name="price" value={updatedBook.price} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm">
                    Save
                </button>
                <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};


export default ManageBooks;