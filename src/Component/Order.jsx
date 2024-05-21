import React, { useState, useEffect } from "react";
import Commonsection from "./CommonSection/Commonsection";
import "../styles/order.css";
import { Container } from "react-bootstrap";
import axios from "axios";
import moment from "moment";

function Order() {
  let customer = JSON.parse(sessionStorage.getItem("user"));
  const [data, setData] = useState([]);
  // console.log("data", data);
  const getData = async () => {
    try {
      const res = await axios.get(
        `https://food-ecom-backend-1.onrender.com/api/v1/user/getorder/${customer?._id}`
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

  return (
    <div>
      <Commonsection title="Order History" />
      <Container>
        <div className="order-history">
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Order Date</th>
                <th>Quantity</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((order, i) => (
                <tr key={order.id}>
                  <td>{++i}</td>
                  <td>{order._id}</td>
                  <td>{order.productname}</td>
                  <td>${order.totalPrice.toFixed(2)}</td>
                  <td>{moment(order.date).format("MMM Do YY")}</td>
                  <td>{order.quantity}</td>
                  <td>{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </div>
  );
}

export default Order;
