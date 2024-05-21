import React, { useState } from "react";
import "./register.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Register() {
  const [visible, setVisible] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.target;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  function ValidateEmail(mail) {
    if (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        mail
      )
    ) {
      return true;
    }
    alert("You have entered an invalid email address!");
    return false;
  }

  function validatename(inputtxt) {
    var phoneno = /^[a-zA-Z]{2,30}$/; // var no = /^\d{10}$/;
    if (inputtxt.match(phoneno)) {
      return true;
    } else {
      alert("You have entered an invalid name!");
      return false;
    }
  }

  function phonenumber(inputtxt) {
    var phoneno = /^[6-9]\d{9}$/; // var no = /^\d{10}$/;
    if (inputtxt.match(phoneno)) {
      return true;
    } else {
      alert("You have entered an invalid mobile number!");
      return false;
    }
  }

  function CheckPassword(inputtxt) {
    var decimal =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/;
    if (inputtxt.match(decimal)) {
      return true;
    } else {
      alert(
        "Password must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character!"
      );
      return false;
    }
  }

  const [name, setname] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const signup = async (e) => {
    e.preventDefault();
    if (!email | !password | !name | !phone) {
      toast.error("Please Fill All The Field");
    } else {
      try {
        if (
          validatename(name) &&
          ValidateEmail(email) &&
          phonenumber(phone) &&
          CheckPassword(password)
        ) {
          const config = {
            url: "/api/v1/auth/register",
            method: "post",
            baseURL: "https://food-ecom-backend-1.onrender.com",
            headers: { "content-type": "application/json" },
            data: {
              name: name,
              email: email,
              phone: phone,
              password: password,
            },
          };
          let res = await axios(config);
          if (res.status === 200) {
            console.log(res.data);
            console.log(res.data.success);
            toast.success("Signup Success");
            window.location.assign("/login");
          }
        }
      } catch (error) {
        console.log(error.response);
        if (error.response) {
          toast.error(error.response.data.error);
        }
      }
    }
  };
  return (
    <>
      <>
        <div className="container contact_hero">
          <div className="form-0">
            <div className="contact-form">
              <div className="circle one"></div>
              <div className="circle two"></div>

              <form onSubmit={handleSubmit}>
                <h3 className="title">Create Account</h3>
                <b style={{ color: "white" }}>
                  Please register below account details
                </b>
                <div className="input-container">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="input"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                    required
                  />
                </div>
                <div className="input-container">
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    className="input"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    required
                  />
                </div>
                <div className="input-container">
                  <input
                    type="tel"
                    placeholder="Mobile No"
                    name="phone"
                    className="input"
                    value={phone}
                    onChange={(e) => setphone(e.target.value)}
                    required
                  />
                </div>
                <div className="mt-1 input-container">
                  <input
                    type={visible ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    autoComplete="current-password"
                    required
                    className="input appearance-none "
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                  />
                  {visible ? (
                    <i
                      class="ri-eye-fill eye_food"
                      onClick={() => setVisible(false)}
                    ></i>
                  ) : (
                    <i
                      class="ri-eye-off-fill eye_food"
                      onClick={() => setVisible(true)}
                    ></i>
                  )}
                </div>
                <button
                  type="submit"
                  className="addTOCart__btn mb-2"
                  style={{ width: "100%" }}
                  onClick={(e) => {
                    signup(e);
                  }}
                >
                  Register
                </button>
                <br />
                <b style={{ color: "white" }}>
                  Already an account holder{" "}
                  <span>
                    <Link to="/login" style={{ color: "#f8931c" }}>
                      Login
                    </Link>
                  </span>
                </b>
              </form>
            </div>
          </div>
        </div>
      </>
    </>
  );
}

export default Register;

//  <Card style={{width:"30rem",border:"none",boxShadow: "0 5px 30px rgb(0 0 0 / 7%)" }}>

//       <Card.Body>

//         <Card.Text>
//         <form>
//       {/* <!-- class named "container" is assigned to div --> */}
//       <div className='d-flex'>
//         <div className=''>
//           <img src="./images/signup-page.png" alt=""  style={{width:"100%"}}/>
//         </div>
//       <div class="ght">
//         <h1>Register</h1>
//         <p>Kindly fill in this form to register.</p>
//         <label  className='mb-3'><b>Username</b></label>
//         <input
//           type="text"
//           placeholder="Enter username"
//           name="username"
//           id="username"
//           required
//         />

//         <label className='mb-3'><b>Email</b></label>
//         <input
//           type="text"
//           placeholder="Enter Email"
//           name="email"
//           id="email"
//           required
//         />
//         <label className='mb-3'><b>Mobile No</b></label>
//         <input
//           type="text"
//           placeholder="Mobile No"
//           name="mobile"
//           id="mobile"
//           required
//         />

//         <label className='mb-3'><b>Password</b></label>
//         <input
//           type="password"
//           placeholder="Enter Password"
//           name="pwd"
//           id="pwd"
//           required
//         />

//         <button type="submit" className='mb-3 mt-3'>Register</button>
//       </div>
//       </div>
//       <div>
//         <p>Already have an account? <a href="/login">Login</a>.</p>
//       </div>
//     </form>
//         </Card.Text>

//       </Card.Body>
//     </Card>
