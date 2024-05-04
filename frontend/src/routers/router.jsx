
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

import App from '../App';
import Home from '../home/home';
import Shop from '../shop/shop';
import About from "../components/about";
import Blog from "../components/Blog";
import Cart from "../components/cart";
import Contact from "../components/contactus";
import Profile from "../components/myprofile";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,  //render whole app from here
      children:[
        {
            path:'/',
            element:<Home/>
        },
        {
            path:"/shop",
            element:<Shop></Shop>//rendering shop page
        },
        {
            path:"/about",
            element:<About></About>//rendering about page
        },
        {
            path:"/blog",//come here when path is /blog
            element:<Blog></Blog>//rendering blog page
        }
        ,
        {
            path:"/contactus",
            element:<Contact></Contact>
        }
        ,
        {
            path:"/myprofile",
            element:<Profile></Profile>
        }
        ,
        {
            path:"/cart",
            element:<Cart></Cart>
        }
      ]
    },
  ]);
  
  export default router;