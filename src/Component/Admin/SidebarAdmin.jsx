import React from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
} from "react-pro-sidebar";
import "./dashboard.css";
import { Link } from "react-router-dom";

function SidebarAdmin() {
  // const { collapseSidebar } = useProSidebar();
  return (
    <>
      <aside className="navbar-aside" id="offcanvas_aside">
        <div
          className="aside-top"
          style={{ height: "auto", minHeight: "500px" }}
        >
          <Sidebar>
            <div
              className="css-1vmkajq"
              style={{ marginBottom: "24px", marginTop: "15px" }}
            >
              <div className="css-kyhzew_0">
                <div className="css-kyhzew">
                  <img
                    src="/assets/images/food-logo.jpg"
                    alt=""
                    style={{
                      width: "51%",
                      height: "100px",
                      marginTop: "-42px",
                    }}
                  />
                  <div className="admin-header">
                    <h3>Admin</h3>
                    <p>ecommerce</p>
                  </div>
                </div>
              </div>
            </div>
            <Menu>
              {/* <SubMenu label="Charts">
                <main>
                  <button onClick={() => collapseSidebar()}>Collapse</button>
                </main>
                <MenuItem> Pie charts </MenuItem>
                <MenuItem> Line charts </MenuItem>
              </SubMenu> */}
              <MenuItem>
                <Link to="/dashboard">
                  <span className="ckjd pe-2">
                    <i class="ri-home-8-line"></i>
                  </span>{" "}
                  Dashboard{" "}
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to="/admin-category">
                  <span className="ckjd pe-2">
                    <i class="ri-list-check"></i>
                  </span>{" "}
                  Categories
                </Link>{" "}
              </MenuItem>
              <MenuItem>
                <Link to="/admin-product">
                  <span className="ckjd pe-2">
                    <i class="ri-shopping-bag-line"></i>
                  </span>{" "}
                  Products
                </Link>{" "}
              </MenuItem>
              <MenuItem>
                <Link to="/admin-add-product">
                  <span className="ckjd pe-2">
                    <i class="ri-shopping-cart-2-line"></i>
                  </span>{" "}
                  Add Products
                </Link>{" "}
              </MenuItem>
              <MenuItem>
                <Link to="/admin-orders">
                  <span className="ckjd pe-2">
                    <i class="ri-shopping-basket-line"></i>
                  </span>{" "}
                  Orders
                </Link>{" "}
              </MenuItem>
              <MenuItem>
                <Link to="/admin-user">
                  <span className="ckjd pe-2">
                    <i class="ri-user-line"></i>
                  </span>{" "}
                  Users{" "}
                </Link>{" "}
              </MenuItem>
              <MenuItem>
                <Link to="/testimonials">
                  <span className="ckjd pe-2">
                    <i class="ri-user-line"></i>
                  </span>{" "}
                  Testimonials{" "}
                </Link>{" "}
              </MenuItem>
              {/* <MenuItem> Calendar </MenuItem> */}
            </Menu>
          </Sidebar>
        </div>
      </aside>
    </>
  );
}

export default SidebarAdmin;
