import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { asyncSignup } from "../actions/loginAction";

const Signup = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    username: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onDataChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const signupUser = (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(userData);
    dispatch(asyncSignup(userData, navigate, setIsLoading));
  };

  return (
    <div className="login_container">
      <Card style={{ width: "30rem" }}>
        <Card.Body>
          <form onSubmit={signupUser}>
            <label className="mb-1" for="exampleInputEmail1">
              Username
            </label>
            <input
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="username"
              name="username"
              value={userData.username}
              onChange={onDataChange}
              required
            />

            <label className="mb-1" for="exampleInputEmail1">
              Email
            </label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Email"
              name="email"
              value={userData.email}
              onChange={onDataChange}
              required
            />

            <label className="mb-1" for="exampleInputEmail1">
              Password
            </label>
            <input
              type="password"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="password"
              name="password"
              value={userData.password}
              onChange={onDataChange}
              required
            />

            <label className="mb-1" for="exampleInputEmail1">
              Password confrim
            </label>
            <input
              type="password"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="password confirm"
              name="passwordConfirm"
              value={userData.passwordConfirm}
              onChange={onDataChange}
              required
            />
            <button  className="mt-4 btn btn-success" disabled={isLoading}>
              {isLoading ? "Loading...." : "SignUp"}
            </button>
          </form>

          <h6 className="d-flex mt-3" style={{ gap: "4px" }}>
            Allready have an acoount?
            <NavLink to={"/login"} className="text-primary">
              Login
            </NavLink>
          </h6>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Signup;
