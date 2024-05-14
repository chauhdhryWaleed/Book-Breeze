import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "../App";
import LoginPage from "../components/login";
import SignUpForm from "../components/registerForm";
import AddBookForm from "../components/addBook";
import BookList from "../components/booklist";
import AboutUsPage from "../components/about";
import Home from "../components/home";
import Dashboard from "../Dashboard/Dashboard";
import ManageBooks from "../components/managebooks";
import Sidebar from "../components/sidebar";
import VerticalLayout from "../components/sample";
import Contactus from "../components/contactus";
import OrdersPage from "../components/orders";
// import ManageBooks from "../components/managebooks";
// import DashboardLayout from "../Dashboard/DashboardLayout";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, //render whole app from here
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/registerForm",
        element: <SignUpForm />,
      },
      {
        path: "/orders",
        element: <OrdersPage />,
      },
      {
        path: "/booklist",
        element: <BookList/>,
      },
      {
        path: "/about",
        element: <AboutUsPage/>,
      },
      {
        path: "/home",
        element: <VerticalLayout />,
      },
      {
        path:"/contactus",
        element:<Contactus/>
      }
    ],
  },

  {
    path: "/adminSidebar",
    element: <Sidebar />,
    children: [
        { path: "/adminSidebar/dashboard", element: <Dashboard /> },
      { path: "/adminSidebar/addBook", element: <AddBookForm /> },
      {
        path: "/adminSidebar/manageBook",
        element: <ManageBooks />,
      },
    ],
  },
]);

export default router;
