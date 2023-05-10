import React, { useRef, useEffect, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Container, ListGroupItem } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import "./header.css";
import axios from "axios";

import { useSelector } from "react-redux";

const nav__links = [
  {
    display: "Home",
    path: "/",
  },
  {
    display: "Foods",
    path: "/foods",
  },
  {
    display: "Cart",
    path: "/cart",
  },
  {
    display: "Contact",
    path: "/contact",
  },
];

function Header() {
  const menuRef = useRef(null);
  const headerRef = useRef(null);

  const { totalQty } = useSelector((state) => state.products);
  // console.log(totalQty)

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");

  // const toggleCart = () => {
  //   dispatch(cartUiActions.toggle());
  // };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("header__shrink");
      } else {
        headerRef.current.classList.remove("header__shrink");
      }
    });

    // return () => window.removeEventListener("scroll");
  }, []);

  // offcanvas

  const [searchTerm, setSearchTerm] = useState("");
  // console.log(searchTerm, "efiowri");
  const [product, setproduct] = useState([]);
  // console.log(product);
  const getProdcut = () => {
    axios
      .get("http://localhost:8000/api/v1/admin/allproduct")
      .then(function (response) {
        // handle success
        setproduct(response.data.product);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  useEffect(() => {
    getProdcut();
  }, []);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const user = JSON.parse(sessionStorage.getItem("user"));
  const signout = () => {
    try {
      axios
        .get("http://localhost:8000/api/v1/auth/logout/" + user._id)
        .then(function (res) {
          if (res.status == 200) {
            sessionStorage.removeItem("user");
            alert("Signout Success....!");
            window.location.assign("/");
            return;
          } else {
            alert("Signout Unsuccessfully");
            return;
          }
        });
    } catch (error) {
      console.warn(error);
      alert("Signout Unsuccessfully");
    }
  };

  let customer = JSON.parse(sessionStorage.getItem("user"));
  let [wishlist, setwishlist] = useState([]);

  const getwislist = () => {
    axios
      .get(
        "http://localhost:8000/api/v1/user/getWishlistByCustomerId/" +
          customer?._id
      )
      .then(function (response) {
        console.log(response.data);
        setwishlist(response.data.success);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    if (customer) {
      getwislist();
    }
  }, []);
  // console.log("raghu dekh yar", customer, wishlist);
  return (
    <>
      <header className="header" ref={headerRef}>
        <Container fluid>
          <div className="nav__wrapper d-flex align-items-center justify-content-between">
            <div className="logo">
              <Link to="/">
                {" "}
                <img src="/assets/images/food-logo.jpg" alt="logo" />
              </Link>
            </div>
            <div
              className="search__widget d-flex align-items-center justify-content-between hgjt "
              style={{
                height: "54px",
                width: " 20%",
                marginLeft: "-60px",
                border: "1px solid #8fd7219c",
              }}
            >
              <input
                type="text"
                placeholder="I'm looking for...."
                style={{
                  height: "40px",
                }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span>
                <i class="ri-search-line"></i>
              </span>
              {searchTerm ? (
                <div
                  style={{
                    position: "absolute",
                    zIndex: 1000,
                    background: "white",
                    top: "85px",
                    left: "20%",
                    padding: "10px 44px",
                    width: "40%",
                  }}
                >
                  {product
                    .filter((item) => {
                      if (searchTerm.value === "") {
                        return item;
                      }
                      if (
                        item.productname
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                      ) {
                        return item;
                      } else {
                        return console.log("not found");
                      }
                    })
                    .map((item) => (
                      <a href={`/fooddetails/${item?._id}`}>
                        <div className="search-food_0">
                          <img
                            src={`http://localhost:8000/product/${item.productimage}`}
                            alt="search-image"
                            style={{ width: "40px", height: "40px" }}
                          />
                          <h6 style={{ color: "black" }}>{item.productname}</h6>
                        </div>
                      </a>
                    ))}
                </div>
              ) : null}
            </div>
            {/* ======= menu ======= */}
            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <div className="menu d-flex align-items-center gap-5">
                {nav__links.map((items, index) => (
                  <NavLink
                    to={items.path}
                    key={index}
                    className={(navClass) =>
                      navClass.isActive ? "active__menu" : ""
                    }
                  >
                    {items.display}
                  </NavLink>
                ))}
              </div>
            </div>

            {/* ======== nav right icons ========= */}
            <div className="nav__right d-flex align-items-center gap-4">
              <span
                className="cart__icon"
                onClick={handleShow}
                // onClick={toggleCart}
              >
                <Link to="/whishlist">
                  <i class="ri-heart-line" title="whislist"></i>
                  <span className="cart__badge">{wishlist.length}</span>
                </Link>
              </span>
              <span
                className="cart__icon"
                onClick={handleShow}
                // onClick={toggleCart}
              >
                <Link to="/cart">
                  <i class="ri-shopping-basket-line" title="cart"></i>
                  <span className="cart__badge">{totalQty}</span>
                </Link>
              </span>

              {user ? (
                <>
                  <span
                    className="user"
                    style={{ fontSize: "18px", fontWeight: "bold" }}
                  >
                    <a> {user.name}</a>
                  </span>
                  <span
                    className="user"
                    onClick={signout}
                    style={{ fontSize: "18px", fontWeight: "bold" }}
                  >
                    <a>Logout</a>
                  </span>
                </>
              ) : (
                <>
                  <span className="user">
                    <Link to="/login">Login</Link>
                  </span>
                </>
              )}

              <span className="mobile__menu" onClick={toggleMenu}>
                <i class="ri-menu-line"></i>
              </span>
            </div>
          </div>
        </Container>
      </header>

      {/* cart-icon  */}
      {/* <Offcanvas show={show} onHide={handleClose} placement="end" name="end">
        <Offcanvas.Header closeButton>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <div className="cart__item-list">
          {cartProducts.length === 0 ? (
            <h6 className="text-center mt-5">No item added to the cart</h6>
          ) : (
            cartProducts.map((item, index) => {
              return(
                <ListGroupItem className="border-0 cart__item" key={index}>
                <div className="cart__item-info d-flex "style={{gap:"20px"}}>
                  <img src={item.image01} alt="product-img" />
          
                  <div className="cart__product-info w-100 d-flex align-items-center gap-4 justify-content-between">
                    <div>
                      <h6 className="cart__product-title">{item.title}</h6>
                      <p className=" d-flex align-items-center gap-5 cart__product-price">
                      {item.quantity}x <span>${item.totalPrice}</span>
                      </p>
                      <div className=" d-flex align-items-center justify-content-between increase__decrease-btn">
                        <span className="increase__btn" onClick={()=>incrementItem()}>
                          <i class="ri-add-line"></i>
                        </span>
                        <span className="quantity">{item.quantity}</span>
                        <span className="decrease__btn" onClick={()=>decreaseItem(item.id)} >
                          <i class="ri-subtract-line"></i>
                        </span>
                      </div>
                    </div>
          
                    <span className="delete__btn" onClick={()=>deleteItem(item.id)} >
                      <i class="ri-close-line"></i>
                    </span>
                  </div>
                </div>
               
              </ListGroupItem>
              )
            }
            ))
          }
        </div>
        <div className="cart__bottom d-flex align-items-center justify-content-between">
                    <h6>
                      Subtotal : <span>${totalAmount}</span>
                    </h6>
                    <button>
                      <Link to="/checkout" onClick={handleClose}>
                        Checkout
                      </Link>
                    </button>
                  </div>
     
        </Offcanvas.Body>
      </Offcanvas> */}
    </>
  );
}

export default Header;
