import { setLogin, setLogout } from "../slice/authSlice";
import { notifyDanger, notifySuccess } from "./customFn";
import axios from "../axios";
import { setProfileData } from "../slice/profileSlice";

export const asyncLogin = (formData, navigate, setIsLoading) => {
  return (dispatch) => {
    const url = "/user/login";
    axios
      .post(url, formData)
      .then((res) => {
        const { message, token } = res.data;
        dispatch(setLogin());
        localStorage.setItem("auth", token);
        notifySuccess(message);
        setIsLoading(false);
        navigate("/blog-list");
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
        notifyDanger(err?.response?.data?.message || "Some Error Occured!");
      });
  };
};


export const asyncSignup = (formData, navigate, setIsLoading) => {
  return (dispatch) => {
    const url = "/user/signup";
    axios
      .post(url, formData)
      .then((res) => {
        const { message, token } = res.data;
        notifySuccess(message);
        setIsLoading(false);
        navigate("/login");
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
        notifyDanger(err?.response?.data?.message || "Some Error Occured!");
      });
  };
};

export const asyncLogOut = (navigate) => {
  return (dispatch) => {
    const url = "/auth/logout";
    const data = {
      token: localStorage.getItem("oeson_auth"),
      id: localStorage.getItem("oeson_id"),
    };
    axios
      .post(url, data)
      .then((res) => {
        localStorage.removeItem("oeson_auth");
        localStorage.removeItem("oeson_role");
        localStorage.removeItem("oeson_id");
        dispatch(setLogout());
        notifySuccess("Logout successfully!");
        if (navigate) {
          navigate("/");
        }
      })
      .catch((err) => {
        // setIsLoading(false);
        console.log(err);
        // notifyDanger(err.response.data.message);
      });
  };
};

export const asyncProfileData = (setIsLoading) => {
  return (dispatch) => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth")}`,
      },
    };
    const url = "/user/myProfile";
    axios
      .get(url, config)
      .then((res) => {
        const { data } = res.data;
        dispatch(setProfileData(data));
        if (setIsLoading) {
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        if (setIsLoading) {
          setIsLoading(false);
        }
        // notifyDanger(err.response.data.message || err.response);
      });
  };
};
