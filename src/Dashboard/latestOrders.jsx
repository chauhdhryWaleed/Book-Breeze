import React, { useState, useEffect } from "react";
import axios from "axios";

const LatestOrdersTable = ({ data }) => {
  const [orderStatus, setOrderStatus] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedOrders, setPaginatedOrders] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [pageNumbers, setPageNumbers] = useState([]);

  const filterOrders = (orders) => {
    return orders.filter((order) =>
      order.orderId.includes(searchQuery) ||
      order.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.status.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };
 

  useEffect(() => {
    let filteredData = filterOrders(data);
     filteredData = filterOrders(data);

    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;
    const paginatedOrders = filteredData.slice(startIndex, endIndex);
    setPaginatedOrders(paginatedOrders);

    const totalPages = Math.ceil(filteredData.length / entriesPerPage);
    setTotalPages(totalPages);

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    setPageNumbers(pageNumbers);
  }, [data]);

  useEffect(() => {
    let startIndex = (currentPage - 1) * entriesPerPage;
    let endIndex = startIndex + entriesPerPage;
    if(searchQuery)
      {
        startIndex = 0;
        endIndex = startIndex + entriesPerPage;
        let filteredData1 = [...paginatedOrders]; 
        let filteredOrders = filteredData1.filter((order) =>
          order.orderId.includes(searchQuery) ||
          order.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.status.toLowerCase().includes(searchQuery.toLowerCase())
        );
        let paginatedOrders1 = filteredOrders.slice(startIndex, endIndex);
        setPaginatedOrders(paginatedOrders1);
      }
    else{
      let filteredData = filterOrders(data);
    let paginatedOrders2 = filteredData.slice(startIndex, endIndex);
    setPaginatedOrders(paginatedOrders2);
  
      const totalPages = Math.ceil(filteredData.length / entriesPerPage);
      setTotalPages(totalPages);
      
      const pageNumbers = [];
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
      setPageNumbers(pageNumbers);
    }
  }
  , [ entriesPerPage, currentPage, searchQuery]);
  
  
  const handlePageChange = (page) => {
    setCurrentPage((prevPage) => {
      if (prevPage !== page) {
        return page;
      }
      return prevPage;
    });
  };

  const handleStatusChange = async (orderId, status) => {
    try {
      const url = 'http://localhost:3000/api/orders/updateStatus/';
      const response = await axios.patch(url + orderId, { status });
      if (response.status === 200) {
        setOrderStatus({ ...orderStatus, [orderId]: status });
      }
      console.log(`Order ID: ${orderId} - New Status: ${status}`);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

 
     
       
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg h-full">
      <div className="flex flex-row justify-between pb-2">
        <div className="flex flex-col">
          <h3 className="text-base font-bold">Latest Orders</h3>
        </div>
      </div>
      <div className="overflow-x-auto">
        <div className="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
          <div className="dataTable-top flex justify-between py-2 my-2">
            <div className="dataTable-dropdown">
              <label>
                <select
                  className="dataTable-selector bg-gray-100 px-4 border rounded-md py-1"
                  value={entriesPerPage}
                  onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                  <option value="25">25</option>
                </select>
                entries per page
              </label>
            </div>
            <div className="dataTable-search bg-gray-100 px-2 border rounded-md">
              <input
                className="dataTable-input py-1 bg-gray-100"
                placeholder="Search..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="dataTable-container">
            <table className="table-sorter table-bordered-bottom w-full text-gray-500 dark:text-gray-400 dataTable-table">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-900 dark:bg-opacity-40">
                  <th style={{ width: "14.6223%" }}>Order ID</th>
                  <th className="hidden lg:table-cell" style={{ width: "30.9504%" }}>Customer</th>
                  <th style={{ width: "17.4655%" }}>Status</th>
                  <th className="hidden lg:table-cell" style={{ width: "16.8968%" }}>Date Added</th>
                  <th style={{ width: "9.26076%" }}>Total</th>
                  <th style={{ width: "10.8042%" }}>Action</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {paginatedOrders.map((order) => (
                  <tr key={order.orderId} className=" border-b border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-900">
                    <td className="py-5 text-center">{order.orderId}</td>
                    <td className="py-5 text-center hidden lg:table-cell">{order.username}</td>
                    <td className="py-5 text-center">{orderStatus[order.orderId] || order.status}</td>
                    <td className="py-5 text-center hidden lg:table-cell">{order.date}</td>
                    <td className="py-5 text-center">{order.totalPrice}</td>
                    <td className="py-5 text-center text-black">
                      <select
                        className="dataTable-selector bg-gray-100 px-4 border rounded-md py-1"
                        value={orderStatus[order.orderId]||order.status}
                        onChange={(e) => handleStatusChange(order.orderId,e.target.value)}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Complete">Complete</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="pagination">
            <ul className="flex align-middle justify-center border-2 gap-2 rounded-md py-2 my-2 ">
              {pageNumbers.map((number) => (
                <li  key={number} className={number === currentPage ? "active py-2 px-3 text-green-700 bg-emerald-300 font-bold border rounded-sm " : "py-2 px-3 border rounded-sm"}>
                  <a onClick={() => handlePageChange(number)} href="#!">
                    {number}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestOrdersTable;
