import React, { useState, useEffect } from "react";
import axios from "axios";
// import DashboardItem from './DashboardItem';
import { BsCart3 } from "react-icons/bs"; // Importing React icons
import DashboardItem from "./dashboardIem";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoPersonOutline } from "react-icons/io5";
import { IoLibraryOutline } from "react-icons/io5";
import LatestOrdersTable from "./latestOrders";
import MonthlySalesCard from "./chart";
import BestSellerTable from "./bestSales";
const AdminDashboard = () => {
  const [tooltips, setTooltips] = useState(false);

  const handleMouseOver = () => {
    setTooltips(true);
  };

  const handleMouseLeave = () => {
    setTooltips(false);
  };
const [totalOrders, setTotalOrders] = useState(null);
const [totalSales,setTotalSales ] = useState(null);
const [totalBooks, setTotalBooks] = useState([]);
const [totalCustomers, setTotalCustomers] = useState(null);
const [monthlySalesData, setMonthlySalesData] = useState({});
const [LatestOrders, setLatestOrders] = useState([]);
useEffect(() => {
  const fetchData = async () => {
      try {
          // Fetch total orders, sales, customers
          const [ latestOrdersRes,ordersRes, salesRes, customersRes, booksRes] = await Promise.all([
            axios.get("http://localhost:3000/api/orders/latestOrders"),
              axios.get("http://localhost:3000/api/orders/totalOrders"),
              axios.get("http://localhost:3000/api/orders/totalSales"),
              axios.get("http://localhost:3000/api/orders/totalCustomers"),
              axios.get("http://localhost:3000/api/books/all-books")
             
          ]);
          setLatestOrders(latestOrdersRes.data);
          setTotalOrders(ordersRes.data.totalOrders);
          setTotalSales(salesRes.data.totalSales);
          setTotalCustomers(customersRes.data.totalCustomers);
          setTotalBooks(booksRes.data);
          // console.log(latestOrdersRes.data);
      } catch (error) {
          console.error("Error fetching data:", error);
      }
  };
const fetchMonthlySales = async () => {
      try {
          const response = await axios.get("http://localhost:3000/api/orders/monthlySales");
          setMonthlySalesData(response.data);
      } catch (error) {
          console.error("Error fetching monthly sales data:", error);
      }
  };

  fetchData();
  fetchMonthlySales();
}, []); // Empty dependency array ensures the effect runs only once

  // Define an array of dashboard items with their props
  const dashboardItems = [
    {
      title: "Total Orders",
      icon: BsCart3,
      iconName: "BsCart3",
      value: totalOrders,
      percentage: "+12%",
      tooltipContent: "Since last month",
      link: "/orders",
    },
    {
      title: "Total Sales",
      icon: HiOutlineShoppingBag,
      iconName: "HiOutlineShoppingBag",
      value: totalSales,
      percentage: "+15%",
tooltipContent: "Since last month",
      link: "/sales",
    },
    {
      title: "Total Customers",
      icon: IoPersonOutline,
      iconName: "IoPersonOutline",
      value: totalCustomers,
      percentage: "-5%",
      tooltipContent: "Since last month",
      link: "/customers",
    },
    {
      title: "Total Books",
      icon: IoLibraryOutline,
      iconName: "IoLibraryOutline",
      value: totalBooks.length,
      percentage: "",
      tooltipContent: "Since last month",
      link: "/totalbooks",
    },
    // Add more dashboard items here if needed
  ];

    return (
    <div className="container flex flex-col">
      <div className="flex flex-wrap flex-row">
        <div className="flex-shrink max-w-full px-4 w-full">
          <p className="text-xl font-bold mt-3 mb-5">Dashboard</p>
        </div>
{/* Loop through the array of dashboard items and render DashboardItem components */}
        <div className="flex gap-2"></div>
        {dashboardItems.map((item, index) => (
          <DashboardItem
            key={index} // Ensure each DashboardItem has a unique key
            title={item.title}
            icon={item.icon}
            iconName={item.iconName}
            value={item.value}
            percentage={item.percentage}
            tooltipContent={item.tooltipContent}
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
            link={item.link}
            tooltips={tooltips}
          />
        ))}
      </div>
      {/* <LatestOrdersTable/> */}
      <div className="flex gap-4 mx-4">
        <MonthlySalesCard salesData={monthlySalesData} />
        <BestSellerTable />
      </div>
      <div className="mx-4">
      <LatestOrdersTable data={LatestOrders}  />
      </div>
    </div>
  );
};

export default AdminDashboard;


