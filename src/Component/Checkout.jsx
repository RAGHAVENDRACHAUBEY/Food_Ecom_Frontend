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

const Checkout = () => {
  const [address, setaddress] = useState([]);
  const getaddress = () => {
    axios
      .get("http://localhost:8000/api/v1/user/getshipping/" + customer?._id)
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

  const addaddress = async (e) => {
    e.preventDefault();
    if (!name || !email || !mobile || !pincode || !state || !country || !city) {
      return toast.error("Please fill all the field");
    }
    try {
      const config = {
        url: "/addshipping",
        method: "post",
        baseURL: "http://localhost:8000/api/v1/user",
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
          console.log("success");
          console.log(res.data.success);
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
        baseURL: "http://localhost:8000/api/v1/user",
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
          console.log("success");
          console.log(res.data.success);
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
      .delete("http://localhost:8000/api/v1/user/deleteshipping/" + id)
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

  return (
    <Helmet title="Checkout">
      <Commonsection title="Checkout" />
      <section>
        <Container>
          <h6 className="mb-4">Shipping Address</h6>
          <div className="row">
            <div className="col-md-6">
              {address?.map((items) => {
                return (
                  <div className="deffer" key={items?.toString()}>
                    <div className="addre_0">
                      <div>
                        <input type="radio" />
                      </div>
                      <div className="ecom-ad">
                        <div>{items.name},</div>
                        <div>
                          {items?.email} ,{" "}
                          <span className="px-2">{items?.mobile},</span>
                        </div>
                        <div>
                          {items?.pincode},{" "}
                          <span className="px-2">{items?.country}</span>{" "}
                          <span className="px-2">{items?.state}</span>,{" "}
                          <span className="px-2">{items?.city}</span>,{" "}
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
                        Edit
                      </button>
                      <button
                        type="submit"
                        className="addTOCart__btn mx-2"
                        onClick={(e) => {
                          deleteaddress(items?._id, e);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="col-md-6"></div>
          </div>

          <Row>
            <Col lg="12" md="12">
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
                          <option value={state1.isoCode}>{state1.name}</option>
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

            {/* <Col lg="4" md="6">
              <div className="checkout__bill">
                <h6 className="d-flex align-items-center justify-content-between mb-3">
                  Subtotal: <span>${cartTotalAmount}</span>
                </h6>
                <h6 className="d-flex align-items-center justify-content-between mb-3">
                  Shipping: <span>${shippingCost}</span>
                </h6>
                <div className="checkout__total">
                  <h5 className="d-flex align-items-center justify-content-between">
                    Total: <span>${totalAmount}</span>
                  </h5>
                </div>
              </div>
            </Col> */}
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
