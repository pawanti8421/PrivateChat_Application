import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Features from "./components/Features";
import HomePage from "./pages/HomePage";
import HeroSection from "./components/HeroSection";
import Privacy from "./components/Privacy";
import HelpCenter from "./components/HelpCenter";
import Login from "./components/Login";
import Registration from "./components/Registration";
import ChatLayout from "./pages/ChatLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        children: [
          {
            path: "/",
            element: <HeroSection />,
          },
          {
            path: "/features",
            element: <Features />,
          },
          {
            path: "/privacy",
            element: <Privacy />,
          },
          {
            path: "/help-center",
            element: <HelpCenter />,
          },
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/registration",
            element: <Registration />,
          },
        ],
      },
      {
        path: "/chatpage/:userId",
        element: <ChatLayout />,
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
