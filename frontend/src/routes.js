import BlogDescription from "./pages/BlogDescription";
import BlogList from "./pages/BlogList";
import CreateBlog from "./pages/CreateBlog";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const RoutesArr = [
  {
    name: "Login",
    path: "/login",
    key: "/login",
    route: "/login",
    page: <Login />,
    private: false,
  },

  {
    name: "signup",
    path: "/signup",
    key: "/signup",
    route: "/signup",
    page: <Signup />,
    private: false,
  },

  {
    name: "Home",
    path: "/",
    key: "/",
    route: "/",
    page: <BlogList />,
    private: true,
  },

  {
    name: "blog-list",
    path: "/blog-list",
    key: "/blog-list",
    route: "/blog-list",
    page: <BlogList />,
    private: true,
  },

  {
    name: "blog-description",
    path: "/blog-description/:id",
    key: "/blog-description",
    route: "/blog-description/:id",
    page: <BlogDescription />,
    private: true,
  },

  {
    name: "create-blog",
    path: "/create-blog",
    key: "/create-blog",
    route: "/create-blog",
    page: <CreateBlog />,
    private: true,
  },
];

export default RoutesArr;
