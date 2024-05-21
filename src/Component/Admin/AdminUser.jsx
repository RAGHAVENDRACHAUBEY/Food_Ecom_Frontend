import axios from "axios";
import React, { useEffect, useState } from "react";

function AdminUser() {
  const [alldata, setalldata] = useState([]);
  console.log(alldata);

  // all user
  const getUser = () => {
    axios
      .get("https://food-ecom-backend-1.onrender.com/api/v1/auth/alluser")
      .then(function (response) {
        // handle success
        console.log(response.data.users);
        setalldata(response.data.users);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <div className="com_use">
        <div className="content-main">
          <div className="content-header">
            <h2 class="content-title mb-4 jbm"> Users </h2>
          </div>
          <div className="card-body">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">
              {alldata.map((e, id) => {
                return (
                  <div className="col mb-3">
                    <div className="card card-user shadow-sm-0">
                      <div className="card-header">
                        <img
                          className="img-md img-avatar"
                          src="images/favicon.png"
                          alt="User pic"
                        />
                      </div>
                      <div className="card-body">
                        <h5 className="card-title mt-5">{e.name}</h5>
                        <div className="card-text text-muted">
                          <p className="m-0">{e.phone}</p>
                          <p>
                            <a href="mailto:admin@example.com">{e.email}</a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              {/* <div className="col">
                <div className="card card-user shadow-sm-0">
                  <div className="card-header">
                    <img
                      className="img-md img-avatar"
                      src="images/favicon.png"
                      alt="User pic"
                    />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title mt-5">Customer Name</h5>
                    <div className="card-text text-muted">
                      <p className="m-0">Customer Mobile No</p>
                      <p>
                        <a href="mailto:admin@example.com">Customer Email Id</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card card-user shadow-sm-0">
                  <div className="card-header">
                    <img
                      className="img-md img-avatar"
                      src="images/favicon.png"
                      alt="User pic"
                    />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title mt-5">Customer Name</h5>
                    <div className="card-text text-muted">
                      <p className="m-0">Customer Mobile No</p>
                      <p>
                        <a href="mailto:admin@example.com">Customer Email Id</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card card-user shadow-sm-0">
                  <div className="card-header">
                    <img
                      className="img-md img-avatar"
                      src="images/favicon.png"
                      alt="User pic"
                    />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title mt-5">Customer Name</h5>
                    <div className="card-text text-muted">
                      <p className="m-0">Customer Mobile No</p>
                      <p>
                        <a href="mailto:admin@example.com">Customer Email Id</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminUser;
