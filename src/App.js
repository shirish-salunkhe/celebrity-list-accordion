import React from "react";
import ReactDOM from "react-dom/client";
import Body from "./components/Body";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AppLayout = () => {
  return (
    <div className="app">
        <Body />
        <ToastContainer />  {/* Add this line to include the ToastContainer */}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<AppLayout />);
