import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import "../styles/whishlist.css";
import Commonsection from "./CommonSection/Commonsection";

function Wishlist() {
  let customer = JSON.parse(sessionStorage.getItem("user"));
  const [wishlist, setwishlist] = useState([]);

  const getwislist = () => {
    axios
      .get(
        "https://food-ecom-backend-1.onrender.com/api/v1/user/getWishlistByCustomerId/" +
          customer?._id
      )
      .then(function (response) {
        // console.log(response.data);
        setwishlist(response.data.success);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const removewishlist = async (item) => {
    if (!customer) {
      alert("Need to Login");
    } else {
      axios({
        method: "delete",
        url:
          "https://food-ecom-backend-1.onrender.com/api/v1/user/removeWishlistbcustomeryId/" +
          customer?._id +
          "/" +
          item?._id,
      })
        .then(function (response) {
          alert("Product removed from wishlist");

          window.location.reload();
        })
        .catch(function (error) {
          //handle error
          console.log(error.response.data);
        });
    }
  };
  // const addCart = async (item, quantity) => {
  //   if (customer) {
  //     try {
  //       const config = {
  //         url: "/addToCartCustomer",
  //         method: "post",
  //         baseURL: "https://food-ecom-backend-1.onrender.com/api",
  //         data: {
  //           productId: item?.productId?._id,
  //           customerId: customer.id,
  //           quantity: quantity,
  //           price: item?.price,
  //           totalPrice: item?.totalPrice,
  //         },
  //       };
  //       await axios(config).then(function (res) {
  //         if ((res.status = 200)) {
  //           removewishlist(item?.productId);
  //           window.location.reload();
  //         }
  //       });
  //     } catch (error) {
  //       console.log(error);
  //       alert(error.response.data.error);
  //     }
  //   } else {
  //     alert("Need to Login");
  //   }
  // };
  useEffect(() => {
    getwislist();
  }, []);

  return (
    <>
      <Commonsection title="Your Wishlist" />
      <div className="cart">
        <Container>
          <Row>
            <Col lg={12} md={12}>
              <div className="cart_hero">
                {wishlist?.length === 0 ? (
                  <>
                    <div className="no__message">
                      <h1>You have no product in the wishlist 🤷‍♂️</h1>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="cart-title">
                      <h2>My Wishlist:</h2>
                      <div class="cart-count">
                        <span className="bigcounter">{wishlist?.length} </span>
                        <span className="cart-item-title">Items</span>
                      </div>
                    </div>
                    {wishlist?.map((items) => {
                      return (
                        <div
                          className="ecommerce_cart"
                          style={{ borderTop: " 1px solid #eeeeee" }}
                        >
                          <div className="item-wrap">
                            <ul className="cart-wrap mt-2">
                              <li className="item-info">
                                <div className="item-img">
                                  <a
                                    href={`/single-pages/${items?.productId?._id}`}
                                  >
                                    <img
                                      src={`https://food-ecom-backend-1.onrender.com/product/${items?.productId?.productimage}`}
                                      alt="food-Image"
                                      className="img-fluid"
                                      style={{
                                        width: "125px",
                                        height: "125px",
                                      }}
                                    />
                                  </a>
                                </div>
                                <div className="item-title">
                                  <p className="fresh_hero">
                                    {items?.productId?.productname}
                                  </p>
                                  {/* <p className="item-option">
                                <b>Size:</b> {items?.Size}
                              </p> */}
                                  <p className="item-option">
                                    {items?.quantity} {" x "}
                                    {items?.totalPrice} $
                                    {/* {Math.round(
                                  Number(items?.price) +
                                    Math.round(
                                      items?.price *
                                        (items?.productId?.tax / 100)
                                    ) -
                                    (Number(items?.price) +
                                      Math.round(
                                        items?.price *
                                          (items?.productId?.tax / 100)
                                      )) *
                                      (items?.productId
                                        ?.customerdiscountpercentage /
                                        100)
                                )} */}
                                  </p>
                                </div>
                              </li>
                              <li className="item-qty">
                                <div className="product-quantity-action">
                                  <div
                                    className="product-quantity"
                                    style={{
                                      fontSize: "16px",
                                      fontWeight: "600",
                                      color: "#00a354",
                                      cursor: "pointer",
                                    }}
                                    // onClick={() => addCart(items, items?.quantity)}
                                  >
                                    Add to cart
                                  </div>
                                </div>
                                <div className="item-remove  mt-2">
                                  {/* <span className="remove-wrap">
                            <Link
                              to="#"
                              style={{
                                fontSize: "16px",
                                color: "#00a354",
                              }}
                            >
                              Buy now
                            </Link>
                          </span> */}
                                </div>
                              </li>
                              <li class="item-price">
                                <span class="money amount full-price-34766798487701">
                                  ${items?.totalPrice}
                                </span>{" "}
                                <br />
                                <span class="money amount full-price-34766798487701">
                                  <i
                                    class="fa fa-times"
                                    aria-hidden="true"
                                    onClick={() =>
                                      removewishlist(items?.productId)
                                    }
                                  ></i>
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}

                {/*  */}
                {/* <div
                  className="ecommerce_cart"
                  style={{ borderTop: " 1px solid #eeeeee" }}
                >
                  <div className="item-wrap">
                    <ul className="cart-wrap  mt-2">
                      <li className="item-info">
                        <div className="item-img">
                          <Link to="#">
                            <img
                              src="/webImages/1.jpg"
                              alt="nalla-Image"
                              className="img-fluid"
                              style={{ width: "125px", height: "125px" }}
                            />
                          </Link>
                        </div>
                        <div className="item-title">
                          <p className="fresh_hero">Fresh green orange</p>
                          <p className="item-option">
                            <b>Size:</b>5kg
                          </p>
                          <p className="item-option">₹800</p>
                        </div>
                      </li>
                      <li className="item-qty">
                        <div className="product-quantity-action">
                          <div
                            className="product-quantity"
                            style={{
                              fontSize: "16px",
                              fontWeight: "600",
                              color: "#00a354",
                            }}
                          >
                            Add to cart
                          </div>
                        </div>
                        <div className="item-remove  mt-2">
                          <span className="remove-wrap">
                            <Link
                              to="#"
                              style={{
                                fontSize: "16px",
                                color: "#00a354",
                              }}
                            >
                              Buy now
                            </Link>
                          </span>
                        </div>
                      </li>
                      <li class="item-price">
                        <span class="money amount full-price-34766798487701">
                          ₹8,00
                        </span>{" "}
                        <br />
                        <span class="money amount full-price-34766798487701">
                          <i class="fa fa-times" aria-hidden="true"></i>
                        </span>
                      </li>
                    </ul>
                  </div>
                </div> */}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Wishlist;
