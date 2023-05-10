import React from "react";
import "./dashboard.css";
import Dropdown from 'react-bootstrap/Dropdown';

function AdminHeader() {
  return (
    <>
      <div className="main-header navbar">
        <div className="col-search">
          <form className="searchform p-0" >
            <div className="input-group">
              <input
                list="search_terms"
                type="text"
                class="form-control"
                placeHolder="Search term"
              />
              <button className="btn btn-light bg" type="button">
                <i class="ri-search-line"></i>
              </button>
            </div>
            <datalist id="search_terms">
              <option value="Products"></option>
              <option value="New orders"></option>
              <option value="Apple iphone"></option>
              <option value="Ahmed Hassan"></option>
            </datalist>
          </form>
        </div>
        <div className="col-nav">
          <ul className="nav">
            <li className="nav-item">
              <a class="nav-link btn-icon " title="Dark mode" href="/">
                <i class="ri-moon-line" style={{fontSize:"21px"}}></i>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link btn-icon" title="Notification" href="/">
                <i class="ri-notification-4-line" style={{fontSize:"21px"}}></i>
              </a>
            </li>

            <li class=" nav-item">
             
              <Dropdown>
      <Dropdown.Toggle variant="outline-success" id="dropdown-basic" style={{border:"none"}}>
      <a  href="/">
                <img
                  class="img-xs rounded-circle"
                  src="/images/favicon.png"
                  alt="User"
                />
              </a>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">  My profile</Dropdown.Item>
        <Dropdown.Item href="#/action-2"> Settings</Dropdown.Item>
        <Dropdown.Item href="#/action-3"> Exit</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
             
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default AdminHeader;
