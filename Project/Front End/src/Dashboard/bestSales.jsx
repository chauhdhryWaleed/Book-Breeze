import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming you're using Axios for HTTP requests

const BestSellerTable = () => {
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/orders/bestSellers'); // Adjust the endpoint as per your backend route
        setBestSellers(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching best sellers:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6  bg-white dark:bg-gray-800 rounded-lg shadow-lg h-full overflow-x-auto">
      <div className="mb-2">
        <table className="table-auto text-sm ltr:text-left rtl:text-right w-full">
          <thead>
            <tr className="border-b dark:border-gray-700">
              <th className="px-4 py-2">Best Seller</th>
              <th className="px-4 py-2">Sales</th>
            </tr>
          </thead>
          <tbody>
            {bestSellers.map((seller, index) => (
              <tr key={index}>
                <td className="px-4 py-5 ">
                  <div className="flex items-center space-x-2">
                    <img className="h-10 w-10 rounded-full" src={seller.imageURL} alt="product images" />
                    <div>
                      <div className="leading-5">{seller.bookTitle}</div>
                      <div className="text-xs leading-5 text-gray-500">{seller.category}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-5">
                  <div className="leading-5 text-green-700">{seller.sales }</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BestSellerTable;
