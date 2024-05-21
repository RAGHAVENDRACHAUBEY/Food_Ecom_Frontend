import React from "react";
import Header from "./Component/Header";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home1 from "./Component/Home1";
import Login from "./Component/Login";
import Register from "./Component/Register";
import Footer from "./Component/Footer";
import Contact from "./Component/Contact";
import AllFood from "./Component/AllFood";
import FoodDetails from "./Component/FoodDetails";
import Cart from "./Component/Cart";
import Checkout from "./Component/Checkout";
import FournotFour from "./Component/FournotFour";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/reset.css";
import Dashboard from "./Component/Admin/Dashboard";
import DashboardHome from "./Component/Admin/DashboardHome";
import AdminProduct from "./Component/Admin/AdminProduct";
import AdminHeader from "./Component/Admin/AdminHeader";
import AdminAddProduct from "./Component/Admin/AdminAddProduct";
import AdminUser from "./Component/Admin/AdminUser";
import AdminOrder from "./Component/Admin/AdminOrder";
import AdminCategory from "./Component/Admin/AdminCategory";
import AdminLogin from "./Component/Admin/AdminLogin";
import AdminProdcutDetails from "./Component/Admin/AdminProdcutDetails";
import Whishlist from "./Component/Whishlist";
import AdminTestimonials from "./Component/Admin/AdminTestimonials";
import Order from "./Component/Order";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <Header />
                <Home1 />
                <Footer />
              </>
            }
          />
          <Route
            exact
            path="/login"
            element={
              <>
                <Header />
                <Login />
                <Footer />
              </>
            }
          />
          <Route
            exact
            path="/register"
            element={
              <>
                <Header />
                <Register />
                <Footer />
              </>
            }
          />
          <Route
            exact
            path="/foods"
            element={
              <>
                <Header />
                <AllFood />
                <Footer />
              </>
            }
          />
          <Route
            exact
            path="/fooddetails/:id"
            element={
              <>
                <Header />
                <FoodDetails />
                <Footer />
              </>
            }
          />
          <Route
            exact
            path="/cart"
            element={
              <>
                <Header />
                <Cart />
                <Footer />
              </>
            }
          />
          <Route
            exact
            path="/whishlist"
            element={
              <>
                <Header />
                <Whishlist />
                <Footer />
              </>
            }
          />
          <Route
            exact
            path="/checkout"
            element={
              <>
                <Header />
                <Checkout />
                <Footer />
              </>
            }
          />
          <Route
            exact
            path="/contact"
            element={
              <>
                <Header />
                <Contact />
                <Footer />
              </>
            }
          />
          <Route
            exact
            path="/admin"
            element={
              <>
                <AdminLogin />
              </>
            }
          />
          <Route
            exact
            path="/admin-product"
            element={
              <Dashboard
                children={
                  <>
                    <AdminHeader />
                    <AdminProduct />
                  </>
                }
              />
            }
          />
          <Route
            exact
            path="/dashboard"
            element={
              <Dashboard
                children={
                  <>
                    <AdminHeader />
                    <DashboardHome />
                  </>
                }
              />
            }
          />
          <Route
            exact
            path="/admin-category"
            element={
              <Dashboard
                children={
                  <>
                    <AdminHeader />
                    <AdminCategory />
                  </>
                }
              />
            }
          />
          <Route
            exact
            path="/admin-add-product"
            element={
              <Dashboard
                children={
                  <>
                    <AdminHeader />
                    <AdminAddProduct />
                  </>
                }
              />
            }
          />
          <Route
            exact
            path="/admin-user"
            element={
              <Dashboard
                children={
                  <>
                    <AdminHeader />
                    <AdminUser />
                  </>
                }
              />
            }
          />
          <Route
            exact
            path="/admin-orders"
            element={
              <Dashboard
                children={
                  <>
                    <AdminHeader />
                    <AdminOrder />
                  </>
                }
              />
            }
          />
          <Route
            exact
            path="/testimonials"
            element={
              <Dashboard
                children={
                  <>
                    <AdminHeader />
                    <AdminTestimonials />
                  </>
                }
              />
            }
          />
          <Route
            exact
            path="/admin-details-page/:id"
            element={
              <Dashboard
                children={
                  <>
                    <AdminHeader />
                    <AdminProdcutDetails />
                  </>
                }
              />
            }
          />
          <Route
            exact
            path="/admin-orders"
            element={
              <Dashboard
                children={
                  <>
                    <AdminHeader />
                    <AdminOrder />
                  </>
                }
              />
            }
          />
          <Route
            exact
            path="/*"
            element={
              <>
                <Header />
                <FournotFour />
                <Footer />
              </>
            }
          />
          <Route
            exact
            path="/orders"
            element={
              <>
                <Header />
                <Order />
                <Footer />
              </>
            }
          />
        </Routes>
      </Router>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
