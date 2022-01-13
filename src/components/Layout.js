import { Navbar } from "./Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Navbar />
      <div className="container p-4">
        <div className="row">
          <Outlet />
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default Layout;
