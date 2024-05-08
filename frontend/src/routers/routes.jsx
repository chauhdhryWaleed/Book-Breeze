
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from '../App';
import LoginPage from "../components/login";
import SignUpForm from "../components/registerForm";
import AddBookForm from "../components/addBook";
import ProductCard from "../components/booklist";
import About from "../components/about";
import Contactus from "../components/contactus";
import Home from "../components/home";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,  //render whole app from here
    children:[
      {
        path:'/home',
        element:<Home/>
    },
      {
          path:'/login',
          element:<LoginPage/>
      },
      {
          path:'/registerForm',
          element:<SignUpForm/>
      },
      {
          path:'/addBook',
          element:<AddBookForm/>
      },
      {
        path:'/booklist',
        element:<ProductCard/>
    }
    ,
    {
      path:'/about',
      element:<About></About>
    }
    ,
    
    {
      path:'/contactus',
      element:<Contactus/>
    }
   

    ]
  },
]);

export default router;








