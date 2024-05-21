import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/checkout.css";
import Commonsection from "./CommonSection/Commonsection";
import Helmet from "./Helmet/Helmet";
// import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { Country, State, City } from "country-state-city";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";
import useRazorpay from "react-razorpay";

const Checkout = () => {
  const { addedProducts, totalQty, subTotalPrice, totalPrice } = useSelector(
    (state) => state.products
  );

  const Razorpay = useRazorpay();
  // console.log("addedProducts", addedProducts);
  const paymentmethod1 = ["Online Payment", "Cash on Delivery"];
  const [address, setaddress] = useState([]);
  const getaddress = () => {
    axios
      .get(
        "https://food-ecom-backend-1.onrender.com/api/v1/user/getshipping/" +
          customer?._id
      )
      .then(function (response) {
        // handle success
        // console.log(response.data.product);
        setaddress(response.data.addaddress);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  useEffect(() => {
    getaddress();
  }, []);

  let customer = JSON.parse(sessionStorage.getItem("user"));
  if (!customer) {
    alert("Please Login");
    window.location.assign("/login");
  } else {
  }

  // Add address
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [mobile, setmobile] = useState("");
  const [pincode, setpincode] = useState("");
  const [state, setstate] = useState("");
  const [country, setcountry] = useState("");
  const [city, setcity] = useState("");

  const CountryList = Country.getAllCountries();
  const StateList = State.getStatesOfCountry(country);
  const CityList = City.getCitiesOfState(country, state);

  const coustomer = JSON.parse(sessionStorage.getItem("user"));
  const [checkradio, setcheckradio] = useState("");
  const [paymentmethod, setpaymentmethod] = useState("");
  const [payid, setpayid] = useState("");

  const addaddress = async (e) => {
    e.preventDefault();
    if (!name || !email || !mobile || !pincode || !state || !country || !city) {
      return toast.error("Please fill all the field");
    }
    try {
      const config = {
        url: "/addshipping",
        method: "post",
        baseURL: "https://food-ecom-backend-1.onrender.com/api/v1/user",
        headers: { "content-type": "application/json" },
        data: {
          userId: coustomer._id,
          name: name,
          email: email,
          mobile: mobile,
          pincode: pincode,
          state: state,
          country: country,
          city: city,
        },
      };
      await axios(config).then(function (res) {
        if ((res.status = 200)) {
          // console.log("success");
          // console.log(res.data.success);
          toast.success("Address Added");
          window.location.reload();
        }
      });
    } catch (error) {
      console.log(error);
      toast.error("Address not added");
    }
  };

  // Edit
  const [update, setupdate] = useState("");
  const [name1, setname1] = useState("");
  const [email1, setemail1] = useState("");
  const [mobile1, setmobile1] = useState("");
  const [pincode1, setpincode1] = useState("");
  const [state2, setstate2] = useState("");
  const [country1, setcountry1] = useState("");
  const [city1, setcity1] = useState("");
  const CountryList1 = Country.getAllCountries();
  const StateList1 = State.getStatesOfCountry(country1);
  const CityList1 = City.getCitiesOfState(country1, state2);

  const editaddress = async (e) => {
    e.preventDefault();
    try {
      const config = {
        url: "/updateshippingaddress/" + update,
        method: "put",
        baseURL: "https://food-ecom-backend-1.onrender.com/api/v1/user",
        headers: { "content-type": "application/json" },
        data: {
          // id: update?.id,
          // userId: coustomer._id,
          name: name1,
          email: email1,
          mobile: mobile1,
          pincode: pincode1,
          state: state2,
          country: country1,
          city: city1,
        },
      };
      await axios(config).then(function (res) {
        if ((res.status = 200)) {
          // console.log("success");
          // console.log(res.data.success);
          toast.success("Address Added");
          window.location.reload();
        }
      });
    } catch (error) {
      console.log(error);
      toast.error("Address not added");
    }
  };
  // Delete

  const deleteaddress = (id, e) => {
    e.preventDefault();
    axios
      .delete(
        "https://food-ecom-backend-1.onrender.com/api/v1/user/deleteshipping/" +
          id
      )
      .then(function (response) {
        console.log(response);
        window.location.reload();
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  // Modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [acc, setacc] = useState("");

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const addPlaceOrder = async () => {
    if (checkradio) {
      if (!paymentmethod) {
        toast.error("Please select the Payment method");
      } else
        try {
          const config = {
            url: "/addorder",
            method: "post",
            baseURL: "https://food-ecom-backend-1.onrender.com/api/v1/user",
            headers: { "content-type": "application/json" },
            data: [
              addedProducts.map((data) => ({
                customerId: customer._id,
                productId: data._id,
                oname: checkradio.name,
                ophoneNumber: checkradio.mobile,
                oemail: checkradio.email,
                ocity: checkradio.city,
                opincode: checkradio.pincode,
                ocountry: checkradio.country,
                address: checkradio.state,
                productname: data.productname,
                quantity: data.qty,
                totalPrice: data.productprice * data.qty,
                paymentId: payid,
                paymentmethod: paymentmethod,
              })),
            ],
          };
          await axios(config).then(function (res) {
            if ((res.status = 200)) {
              // console.log("success");
              toast.success("Order Placed Successfully");
              localStorage.removeItem("addedProducts");
              localStorage.removeItem("totalQty");
              localStorage.removeItem("subTotalPrice");
              localStorage.removeItem("totalPrice");
              window.location.assign("/");
            }
          });
        } catch (error) {
          console.log(error);
          alert("Somthing went wrong");
        }
    } else {
      toast.error("Please select the shipping address");
    }
  };

  const postTransaction = async () => {
    if (!checkradio) {
      toast.error("Please select the shipping address");
    } else if (!paymentmethod) {
      toast.error("Please select the Payment method");
    } else if (paymentmethod !== "Online Payment") {
      addPlaceOrder();
    } else {
      try {
        const res = await loadScript(
          "https://checkout.razorpay.com/v1/checkout.js"
        );
        if (!res) {
          toast.error("Failed to load Razorpay SDK");
          return;
        }

        const options = {
          key: "rzp_test_5vCRZ6rLM2wGN4",
          amount: totalPrice.toFixed(2) * 100,
          currency: "INR",
          name: "Food",
          description: "Order Amount",
          image: "../images/food-logo-footer.png",
          handler: function (response) {
            toast.success("Payment Successful");
            setpayid(response.razorpay_payment_id);
          },
          prefill: {
            name: customer?.name,
            email: customer?.email,
            contact: customer?.phoneNumber,
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } catch (error) {
        console.error("Error in initiating payment:", error);
      }
    }
  };

  useEffect(() => {
    if (payid) {
      addPlaceOrder();
    }
  }, [payid]);

  return (
    <Helmet title="Checkout">
      <Commonsection title="Checkout" />
      <section>
        <Container>
          <h6 className="mb-4">Shipping Address</h6>
          <button
            type="submit"
            className="addTOCart__btn mx-2"
            onClick={() => {
              setacc(!acc);
            }}
          >
            Add Address
          </button>
          <div className="row">
            <div className="col-md-6">
              {address?.map((items) => {
                return (
                  <div className="deffer" key={items?.toString()}>
                    <div className="addre_0">
                      <div>
                        <input
                          type="radio"
                          name="radiovalues"
                          id="address"
                          value={checkradio}
                          onChange={(e) => setcheckradio(items)}
                        />
                      </div>
                      <div className="ecom-ad">
                        <div>{items.name},</div>
                        <div>
                          {items?.email} ,{" "}
                          <span className="px-2">{items?.mobile},</span>
                        </div>
                        <div>
                          {items?.pincode},{" "}
                          <span className="px-2">{items?.city}</span>,{" "}
                          <span className="px-2">{items?.state}</span>,{" "}
                          <span className="px-2">{items?.country}</span>{" "}
                        </div>
                      </div>
                    </div>

                    <div className="btn-add">
                      <button
                        type="submit"
                        className="addTOCart__btn"
                        onClick={() => {
                          setupdate(items?._id);
                          handleShow();
                        }}
                      >
                        <i class="ri-edit-box-line"></i>
                      </button>
                      <button
                        type="submit"
                        className="addTOCart__btn mx-2"
                        onClick={(e) => {
                          deleteaddress(items?._id, e);
                        }}
                      >
                        <i class="ri-delete-bin-6-line"></i>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="col-md-6">
              {/* <Col lg="6" md="6"> */}
              <div className="checkout__bill">
                <h6 className="d-flex align-items-center justify-content-between mb-3">
                  Subtotal:
                  <span>${totalPrice}</span>
                </h6>

                <div className="checkout__total">
                  <h5 className="d-flex align-items-center justify-content-between">
                    Total:
                    <span>${totalPrice}</span>
                  </h5>
                </div>
                <Button
                  className="addTOCart__btn checkout_button"
                  onClick={postTransaction}
                >
                  {/* <div style={{color:"white"}}> */}
                  PAYMENT
                  {/* </div> */}
                </Button>
              </div>
            </div>
            {/* </Col> */}
          </div>
          <div
            style={{
              border: "1px solid green",
              width: "fit-content",
              padding: "6px 120px 5px 10px",
            }}
          >
            <h6>PAYMENT TYPE</h6>
            <div className="addre_0">
              {paymentmethod1.map((item) => (
                <>
                  <input
                    style={{ marginLeft: "5px" }}
                    type="radio"
                    id="address"
                    name="radiovalues"
                    value={paymentmethod}
                    onChange={(e) => setpaymentmethod(item)}
                  />
                  <label for="address" className="mb-0">
                    {item}
                  </label>
                </>
              ))}
            </div>
          </div>
          <Row>
            {acc ? (
              <>
                {" "}
                <Col lg="6" md="6">
                  <form className="checkout__form">
                    <Row>
                      <Col md="6">
                        {" "}
                        <div className="form__group">
                          <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setname(e.target.value)}
                            required
                          />
                        </div>
                      </Col>
                      <Col md="6">
                        {" "}
                        <div className="form__group">
                          <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                            required
                          />
                        </div>
                      </Col>
                      <Col md="6">
                        {" "}
                        <div className="form__group">
                          <input
                            type="number"
                            placeholder="Phone number"
                            value={mobile}
                            onChange={(e) => setmobile(e.target.value)}
                            required
                          />
                        </div>
                      </Col>
                      <Col md="6">
                        {" "}
                        <div className="form__group">
                          <select
                            className="addinput11"
                            name="Country"
                            required
                            onChange={(e) => setcountry(e.target.value)}
                          >
                            <option value="">Select Country</option>
                            {CountryList.map((Country) => (
                              <option value={Country.isoCode}>
                                {Country.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </Col>
                      <Col md="6">
                        {" "}
                        <div className="form__group">
                          <select
                            className="addinput11"
                            name="State"
                            required
                            onChange={(e) => setstate(e.target.value)}
                          >
                            <option value="">Select State</option>
                            {StateList.map((state1) => (
                              <option value={state1.isoCode}>
                                {state1.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </Col>
                      <Col md="6">
                        <div className="form__group">
                          <select
                            className="addinput11"
                            name="City"
                            required
                            onChange={(e) => setcity(e.target.value)}
                          >
                            <option value="">Select City</option>
                            {CityList.map((city1) => (
                              <option value={city1.name}>{city1.name}</option>
                            ))}
                          </select>
                        </div>
                      </Col>
                      <Col md="6">
                        {" "}
                        <div className="form__group">
                          <input
                            type="text"
                            placeholder="Pin Code"
                            value={pincode}
                            onChange={(e) => setpincode(e.target.value)}
                            required
                          />
                        </div>
                      </Col>
                    </Row>

                    <button
                      type="submit"
                      className="addTOCart__btn"
                      onClick={addaddress}
                    >
                      Submit
                    </button>
                  </form>
                </Col>
              </>
            ) : (
              <></>
            )}
          </Row>
        </Container>
      </section>
      {/* Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <form>
              <div className="form__group">
                <input
                  type="text"
                  placeholder="Enter your Name"
                  value={name1}
                  onChange={(e) => setname1(e.target.value)}
                  required
                />
              </div>
              <div className="form__group">
                <input
                  type="email"
                  placeholder="Enter your Email"
                  value={email1}
                  onChange={(e) => setemail1(e.target.value)}
                  required
                />
              </div>
              <div className="form__group">
                <input
                  type="number"
                  placeholder="Enter your Mobile No"
                  value={mobile1}
                  onChange={(e) => setmobile1(e.target.value)}
                  required
                />
              </div>
              <div className="form__group">
                <select
                  className="addinput11"
                  name="Country"
                  required
                  onChange={(e) => setcountry1(e.target.value)}
                >
                  <option value="">Select Country</option>
                  {CountryList1.map((Country) => (
                    <option value={Country.isoCode}>{Country.name}</option>
                  ))}
                </select>
              </div>
              <div className="form__group">
                <select
                  className="addinput11"
                  name="State"
                  required
                  onChange={(e) => setstate2(e.target.value)}
                >
                  <option value="">Select State</option>
                  {StateList1.map((state1) => (
                    <option value={state1.isoCode}>{state1.name}</option>
                  ))}
                </select>
              </div>
              <div className="form__group">
                <select
                  className="addinput11"
                  name="City"
                  required
                  onChange={(e) => setcity1(e.target.value)}
                >
                  <option value="">Select City</option>
                  {CityList1.map((city1) => (
                    <option value={city1.name}>{city1.name}</option>
                  ))}
                </select>
              </div>
              <div className="form__group">
                <input
                  type="text"
                  placeholder="Enter your Pincode"
                  value={pincode1}
                  onChange={(e) => setpincode1(e.target.value)}
                  required
                />
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={(e) => {
              editaddress(e);
              // handleClose();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Helmet>
  );
};

export default Checkout;
