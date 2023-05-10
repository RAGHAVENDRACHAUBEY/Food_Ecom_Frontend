import React from "react";

function DashboardHome() {
  return (
    <div className="com_use">
      <div className="content-main">
        <div className="content-header">
          <h2 class="content-title mb-4 jbm"> Dashboard </h2>
        </div>
        <div className="row">
          <div className="col-lg-4">
            <div class="card card-body mb-4 shadow-sm-0 ">
              <article class="icontext">
                <span class="icon icon-sm rounded-circle alert-primary">
                  <i class="text-primary fas fa-usd-circle">₹</i>
                </span>
                <div class="text my-0">
                  <h6 class="mb-1">Total User</h6> <span>₹22,678</span>
                </div>
              </article>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="card card-body mb-4 shadow-sm-0 ">
              <article class="icontext">
                <span class="icon icon-sm rounded-circle alert-success">
                <i class="ri-shopping-basket-line text-success"></i>
                 
                </span>
                <div class="text my-0">
                  <h6 class="mb-1">Total Orders</h6>
                  <span>130</span>
                </div>
              </article>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="card card-body mb-4 shadow-sm-0 ">
              <article class="icontext">
                <span class="icon icon-sm rounded-circle alert-warning">
                <i class="text-warning ri-shopping-bag-line"></i>
                  
                </span>
                <div class="text my-0">
                  <h6 class="mb-1">Total Products</h6>
                  <span>70</span>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;
