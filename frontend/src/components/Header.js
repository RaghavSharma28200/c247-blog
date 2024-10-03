import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogout } from "../slice/authSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profileData = useSelector((state) => state.profileData.userData);

  return (
    <nav class="navbar navbar-light bg-primary">
      <div className="d-flex justify-content-between w-100 px-3 py-2">
        <h4 className="text-light">Welcome, {profileData.username} </h4>
        <button
          onClick={() => {
            localStorage.removeItem("auth");
            navigate("/login");
            dispatch(setLogout());
          }}
          className="btn btn-danger"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Header;
