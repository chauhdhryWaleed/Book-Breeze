import React, { useState } from 'react';
// import DashboardItem from './DashboardItem';
import { BsCart3 } from "react-icons/bs"; // Importing React icons
import DashboardItem from './dashboardIem';
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoPersonOutline } from "react-icons/io5";
import { IoLibraryOutline } from "react-icons/io5";
const AdminDashboard = () => {
  const [tooltips, setTooltips] = useState(false);

  const handleMouseOver = () => {
    setTooltips(true);
  };

  const handleMouseLeave = () => {
    setTooltips(false);
  };

  // Define an array of dashboard items with their props
  const dashboardItems = [
    {
      title: "Total Orders",
      icon: BsCart3,
      iconName: "BsCart3",
      value: "421",
      percentage: "+12%",
      tooltipContent: "Since last month",
      link: "/orders"
    },
    {
      title: "Total Sales",
      icon: HiOutlineShoppingBag,
      iconName: "HiOutlineShoppingBag",
      value: "$31K",
      percentage: "+15%",
      tooltipContent: "Since last month",
      link: "/sales"
    },
    {
      title: "New Customers",
      icon: IoPersonOutline,
      iconName: "IoPersonOutline",
      value: "1.2K",
      percentage: "-5%",
      tooltipContent: "Since last month",
      link: "/customers"
    },
    {
      title: "Total Books",
      icon: IoLibraryOutline,
      iconName: "IoLibraryOutline",
      value: "602",
      percentage: "",
      tooltipContent: "Since last month",
      link: "/totalbooks"
    }
    // Add more dashboard items here if needed
  ];

  return (
    <div className="flex flex-wrap flex-row">
      <div className="flex-shrink max-w-full px-4 w-full">
        <p className="text-xl font-bold mt-3 mb-5">Dashboard</p>
      </div>
      {/* Loop through the array of dashboard items and render DashboardItem components */}
      {dashboardItems.map((item, index) => (
        <DashboardItem
          key={index} // Ensure each DashboardItem has a unique key
          title={item.title}
          icon={item.icon}
          iconName = {item.iconName}
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
  );
};

export default AdminDashboard;
