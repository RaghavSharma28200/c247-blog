import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { asyncLogin } from "../actions/loginAction";

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onDataChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const LoginSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(asyncLogin(userData, navigate, setIsLoading));
  };

  return (
    <div className="login_container">
      <Card style={{ width: "30rem" }}>
        <Card.Body>
          <form onSubmit={LoginSubmit}>
            <label className="mb-1" for="exampleInputEmail1">
              Email
            </label>
            <input
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Email"
              value={userData.email}
              name="email"
              onChange={onDataChange}
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
              value={userData.password}
              name="password"
              onChange={onDataChange}
            />
            <button className="btn btn-success mt-3" disabled={isLoading}>
              {isLoading ? "Loading...." : "Login"}
            </button>
          </form>
          <h6 className="d-flex mt-3" style={{ gap: "4px" }}>
            Don't have account?{" "}
            <NavLink to={"/signup"} className="text-primary">
              Signup
            </NavLink>
          </h6>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
