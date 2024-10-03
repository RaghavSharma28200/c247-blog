import toast from "react-hot-toast";
import { Navigate, Route } from "react-router-dom";


const checkLogin = () => {
  var status = false;
  if (localStorage.getItem("auth") != null) {
    status = true;
  }
  return status;
};

const GetRoutes = (allRoutes) =>
  allRoutes.map((route) => {
    if (route.path) {
      return (
        <Route
          exact
          path={route.path}
          element={
            route.private === true ? (
              checkLogin() === true ? (
                route.page
              ) : (
                <Navigate to="/login" />
              )
            ) : (
              route.page
            )
          }
          key={route.key}
        />
      );
    }

    return null;
  });



const notifySuccess = (notification) => toast.success(notification);

const notifyDanger = (notification) => toast.error(notification);


export { GetRoutes,  notifySuccess, notifyDanger};
