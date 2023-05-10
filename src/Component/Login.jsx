import React, { useState } from "react";
import "./register.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {
  const [visible, setVisible] = useState(false);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const signin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please Fill All The Field");
    } else {
      try {
        const config = {
          url: "/api/v1/auth/login",
          method: "post",
          baseURL: "http://localhost:8000",
          headers: { "content-type": "application/json" },
          data: {
            email: email,
            password: password,
          },
        };
        let res = await axios(config);
        if (res.status === 200) {
          console.log(res.data);
          console.log(res.data.success);
          toast.success("Login Success");
          sessionStorage.setItem("user", JSON.stringify(res.data.user));
          window.location.assign("/");
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
      <div className="container contact_hero">
        <div className="form-0">
          <div className="contact-form">
            <div className="circle one"></div>
            <div className="circle two"></div>

            <form action="#" autocomplete="off">
              <h3 className="title">Login</h3>
              <b style={{ color: "white" }}>
                Please login below account details
              </b>
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

              <div className="mt-1 input-container">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  className="input appearance-none "
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
              <input
                type="submit"
                value="Login"
                className="addTOCart__btn mb-2"
                style={{ width: "100%" }}
                onClick={(e) => {
                  signin(e);
                }}
              />
              <br />
              <b style={{ color: "white" }}>
                Don't have an account?
                <span>
                  {" "}
                  <Link to="/register" style={{ color: "#f8931c" }}>
                    Register
                  </Link>
                </span>
              </b>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
