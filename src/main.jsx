import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";

import Home from "./pages/Home.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login/Login.jsx";
import Signup from "./components/Signup.jsx";
import Cart from "./pages/Cart.jsx";
import SellerDashBoard from "./components/SellerDashBoard.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children:[
      {
        path: "/",
        element: <Home />
      },
      {
        path:'/login',
        element: <Login/>
      },
      {
        path:'/signup',
        element: <Signup/>
      },
      {path:'/cart',
        element:<Cart/>
      },
      {
        path:'/sellerdashboard',
        element:<SellerDashBoard/>
      }
    ]
  }
])


ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);
