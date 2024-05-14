import React, { useState } from 'react'
import { Button, Label, Select, TextInput, Textarea } from 'flowbite-react';
import { useLoaderData, useParams } from 'react-router-dom';

const EditBooks = () => {
  const { id } = useParams();
  const { bookTitle, authorName, imageURL, category, bookDescription, bookPDFURL, price } = useLoaderData();

  const bookCategories = [
    "Fiction",
    "Non-fiction",
    "Mystery",
    "Programming",
    "Science fiction",
    "Fantasy",
    "Horror",
    "Biography",
    "Autobiography",
    "History",
    "Self-help",
    "Business",
    "Memoir",
    "Poetry",
    "Children's books",
    "Travel",
    "Religion and spirituality",
    "Science",
    "Art and design",
  ];

  const [selectedBookCategory, setSelectedBookCategory] = useState(
    category
  );

  const handleChangeSelectedValue = (event) => {
    setSelectedBookCategory(event.target.value);
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    const form = event.target;

    const updatedBook = {
      bookTitle: form.bookTitle.value,
      authorName: form.authorName.value,
      imageURL: form.imageURL.value,
      category: form.categoryName.value,
      bookDescription: form.bookDescription.value,
      bookPDFURL: form.bookPDFURL.value,
      price: form.price.value, // Updated price
    };

    fetch(`http://localhost:5000/book/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedBook),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };
  
  return (
    <div className='px-4 my-12'>
      <h2 className='mb-8 text-3xl font-bold'>Edit A Book!</h2>
      <form className="flex lg:w-[1180px] flex-col flex-wrap gap-4" onSubmit={handleUpdate}>

        {/* first row */}
        <div className='flex gap-8'>

          {/* book name */}
          <div className='lg:w-1/2'>
            <Label htmlFor="bookTitle" value="Book Title" />
            <TextInput id="bookTitle" placeholder="Book Name" required type="text" name='bookTitle' className='w-full' defaultValue={bookTitle} />
          </div>

          {/* author name */}
          <div className='lg:w-1/2'>
            <Label htmlFor="authorName" value="Author Name" />
            <TextInput id="authorName" placeholder="Author Name" required type="text" name='authorName' className='w-full' defaultValue={authorName} />
          </div>

        </div>

        {/* 2nd Row */}
        <div className='flex gap-8'>
          {/* book url */}
          <div className='lg:w-1/2'>
            <Label htmlFor="imageURL" value="Book Image URL" />
            <TextInput id="imageURL" placeholder="Image URL" required type="text" name='imageURL' className='w-full' defaultValue={imageURL} />
          </div>

          {/* book category */}
          <div className='lg:w-1/2'>
            <Label htmlFor="inputState" value="Book Category" />
            <Select id="inputState" name="categoryName" className="w-full rounded" value={selectedBookCategory} onChange={handleChangeSelectedValue}>
              {bookCategories.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </Select>
          </div>

        </div>

        {/* Book Price */}
        <div className='lg:w-1/2'>
          <Label htmlFor="price" value="Price" />
          <TextInput id="price" placeholder="Price" required type="number" step="0.01" min="0" name='price' className='w-full' defaultValue={price} />
        </div>

        {/* full width div for book description */}
        <div>
          <Label htmlFor="bookDescription" value="Book Description" />
          <Textarea id="bookDescription" placeholder="Book Description" required type="text" name='bookDescription' className='w-full' rows={4} defaultValue={bookDescription} />
        </div>

        {/* book pdf url */}
        <div>
          <Label htmlFor="bookPDFURL" value="Book PDF Link" />
          <TextInput id="bookPDFURL" placeholder="Paste Book PDF URL here" required type="text" name='bookPDFURL' className='w-full' defaultValue={bookPDFURL} />
        </div>

        {/* Submit btn */}
        <Button type="submit" className='mt-5'>
          Update book
        </Button>

      </form>
    </div>
  )
}

export default EditBooks