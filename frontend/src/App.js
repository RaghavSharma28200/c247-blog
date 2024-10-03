

import {  useEffect } from "react";
import { Routes, useLocation, useNavigate } from "react-router-dom";
import RoutesArr from "./routes";
import { GetRoutes } from "./actions/customFn";
import { useDispatch, useSelector } from "react-redux";
import { setLogin, setLogout } from "./slice/authSlice";
// import { asyncLogOut, asyncProfileData } from "./actions/loginAction";
import { jwtDecode } from "jwt-decode";

import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import { asyncProfileData } from "./actions/loginAction";

function App() {
  const dispatch = useDispatch();
  const {pathname} = useLocation()
  const isLoggedIn = useSelector((state)=>state.authData.auth)
  const navigate = useNavigate()
  
  useEffect(() => {
    if (localStorage.getItem("auth")) {
      dispatch(setLogin());
    } else {
      dispatch(setLogout());
    }
  }, []);


  useEffect(() => {
    if (isLoggedIn) {
      dispatch(asyncProfileData());
    }
  }, [isLoggedIn]);


  const checkTokenExp = () => {
    const token = localStorage.getItem("auth");
    if (token) {
      if (jwtDecode(token).exp < Date.now() / 1000) {
        // dispatch(asyncLogOut(navigate))
      }
    }
  };

  useEffect(() => {
    checkTokenExp();
  }, [pathname]);


  return (
      <Routes>{GetRoutes(RoutesArr)}</Routes>
  );
}

export default App;
