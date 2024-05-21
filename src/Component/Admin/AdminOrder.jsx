import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import "./adminproduct.css";
import Form from "react-bootstrap/Form";
import moment from "moment";

function AdminOrder() {
  const [data, setData] = useState([]);
  // console.log("data", data);
  const getData = async () => {
    try {
      const res = await axios.get(
        "https://food-ecom-backend-1.onrender.com/api/v1/user/getallorder"
      );
      if (res.status == 200) {
        setData(res.data.success);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Search

  const [searchTerm, setSearchTerm] = useState("");

  const [pageNumber, setPageNumber] = useState(0);

  const searchedProduct = data.filter((item) => {
    if (searchTerm.value === "") {
      return item;
    }
    if (item.productname.toLowerCase().includes(searchTerm.toLowerCase())) {
      return item;
    } else {
      return console.log("not found");
    }
  });

  // Pegination
  const productPerPage = 7;
  const visitedPage = pageNumber * productPerPage;
  const displayPage = searchedProduct.slice(
    visitedPage,
    visitedPage + productPerPage
  );

  const pageCount = Math.ceil(searchedProduct.length / productPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <>
      <div className="com_use">
        <div className="content-main">
          <div className="content-header">
            <h2 className="content-title jbm">Orders History</h2>
          </div>
          <div className="">
            <div
              className="search__widget d-flex align-items-center justify-content-between mb-4"
              style={{ backgroundColor: "#fff" }}
            >
              <input
                type="text"
                placeholder="Search...."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span>
                <i class="ri-search-line"></i>
              </span>
            </div>
            <div
              className="pro_A"
              style={{ overflow: "hidden", overflowX: "scroll" }}
            >
              <table className="table table-bordered">
                <thead>
                  <tr style={{ textAlign: "center" }}>
                    <th>S.No</th>
                    <th>User_id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone no</th>
                    <th>Address</th>
                    <th>Product Name</th>
                    <th>Product Quantity</th>
                    <th>Total Price</th>
                    <th>Booking date</th>
                    <th>Update date</th>
                    <th>Payment Id</th>
                    <th>Payment method</th>
                    <th>Product Status</th>
                    <th>Update</th>
                  </tr>
                </thead>
                <tbody>
                  {displayPage.map((ele, i) => {
                    return (
                      <tr>
                        <td className="text-center cart__img-box">{++i}</td>
                        <td className="text-center">
                          <div>{ele?._id}</div>
                        </td>
                        {/* <td className="text-center">
                          <div>{ele?.customerId?.name}</div>
                        </td>
                        <td className="text-center">
                          <div>{ele?.customerId?.email}</div>
                        </td> */}
                        <td className="text-center">
                          <div style={{ width: "150px" }}>{ele?.oname}</div>
                        </td>
                        <td className="text-center">
                          <div style={{ width: "200px" }}>{ele?.oemail}</div>
                        </td>
                        <td className="text-center">
                          <div style={{ width: "150px" }}>
                            {ele?.ophoneNumber}
                          </div>
                        </td>
                        <td className="text-center">
                          <div style={{ width: "200px" }}>
                            {ele?.ocity},{ele?.opincode},{ele?.address},
                            {ele?.ocountry}
                          </div>
                        </td>
                        <td className="text-center">
                          <div style={{ width: "200px" }}>
                            {ele?.productname}
                          </div>
                        </td>
                        <td className="text-center cart__item-del">
                          <div>{ele?.quantity}</div>
                        </td>
                        <td className="text-center cart__item-del">
                          <div style={{ width: "100px" }}>
                            ${ele?.totalPrice.toFixed(2)}
                          </div>
                        </td>
                        <td className="text-center cart__item-del">
                          <div>
                            {moment(ele?.createdAt).format("MMM Do YY")}
                          </div>
                        </td>

                        <td className="text-center cart__item-del">
                          <div>
                            {moment(ele?.updatedAt).format("MMM Do YY")}
                          </div>
                        </td>
                        <td className="text-center cart__item-del">
                          <div>{ele?.paymentId}</div>
                        </td>
                        <td className="text-center cart__item-del">
                          <div style={{ width: "200px" }}>
                            {ele?.paymentmethod}
                          </div>
                        </td>
                        <td className="text-center cart__item-del">
                          <div style={{ width: "150px" }}>{ele?.status}</div>
                        </td>
                        <td className="text-center cart__item-del">
                          <div style={{ width: "200px" }}>
                            <Form.Select aria-label="Default select example">
                              <option>Update Status</option>
                              <option value="1">Pending</option>
                              <option value="2">Confirm</option>
                              <option value="3">Shipped</option>
                              <option value="4">Out for delivery</option>
                              <option value="5">Delivered</option>
                            </Form.Select>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div>
              <ReactPaginate
                pageCount={pageCount}
                onPageChange={changePage}
                previousLabel={"Prev"}
                nextLabel={"Next"}
                containerClassName=" paginationBttns "
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminOrder;
