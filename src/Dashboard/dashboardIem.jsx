import React from 'react';
import { Link } from 'react-router-dom';

const DashboardItem = ({
  title,
  icon:Icon,
  iconName,
  value,
  percentage,
  tooltipContent,
  onMouseOver,
  onMouseLeave,
  link,
  pulse,
  tooltips
}) => {
    const iconColors = {
        'BsCart3': 'bg-pink-100 text-pink-500 dark:bg-pink-900',
        'HiOutlineShoppingBag': 'bg-yellow-100 text-yellow-500 dark:bg-yellow-900',
        'IoPersonOutline': 'bg-green-100 text-green-500 dark:bg-green-900',
        'IoLibraryOutline': 'bg-indigo-100 text-indigo-500 dark:bg-indigo-900'
      };
     
      const iconColor = iconColors[iconName];
      console.log(iconName)
  return (
    <div className="flex-shrink max-w-full px-4 w-full sm:w-1/2 lg:w-1/4 mb-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg h-full">
        <div className="pt-6 px-6 relative text-sm font-semibold">
          {title}
          <div
            onMouseOver={onMouseOver}
            onMouseLeave={onMouseLeave}
            className="ltr:float-right rtl:float-left text-green-500"
          >
            {/* {percentage && <span>{percentage}</span>} */}
            <div
              className="absolute top-auto bottom-full mb-3"
              style={{ display: tooltips ? 'block' : 'none' }}
            >
              <div className="z-40 w-32 p-2 -mb-1 text-sm leading-tight text-white bg-black rounded-lg shadow-lg text-center">
                {tooltipContent}
              </div>
              <div className="absolute transform -rotate-45 p-1 w-1 bg-black bottom-0 -mb-2 ltr:ml-6 rtl:mr-6"></div>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between align-middle items-center px-6 py-4">
        <div className={` self-center w-14 h-14 rounded-full   ${iconColor} dark:bg-pink-900 dark:bg-opacity-40 relative text-center `}>
        {<Icon  className="absolute right-3 top-3"style={{ width: '2em', height: '2em' }}/>} 
          </div> 
          <h2 className="self-center text-3xl">{value}</h2>
        </div>
        <div className="px-6 pb-6">
          <Link to={link} className="hover:text-indigo-500 text-sm">View more...</Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardItem;
