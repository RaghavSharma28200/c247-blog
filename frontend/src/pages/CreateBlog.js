import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import { notifyDanger, notifySuccess } from "../actions/customFn";
import Header from "../components/Header";

const CreateBlog = () => {
  const [blogData, setblogData] = useState({
    title: "",
    content: "",
  });

  const profileData = useSelector((state) => state.profileData.userData);

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onDataChange = (e) => {
    const { name, value } = e.target;
    setblogData({ ...blogData, [name]: value });
  };

  const createBlog = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      lastEditedBy: profileData._id,
      title: blogData.title,
      content: blogData.content,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth")}`,
      },
    };
    const url = "/blog/create-blog";
    axios
      .post(url, data, config)
      .then((res) => {
        const { message } = res.data;
        notifySuccess(message);
        setIsLoading(false);
        navigate("/blog-list");
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        notifyDanger(
          err.response.data.message || err.response || "Some error occured"
        );
      });
  };

  return (
    <>
      <Header />
      <div className="login_container">
        <Card style={{ width: "30rem" }}>
          <Card.Body>
            <h4>Create Blog</h4>
            <form onSubmit={createBlog}>
              <label className="mb-1" for="exampleInputEmail1">
                Title
              </label>
              <input
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter Title"
                value={blogData.title}
                name="title"
                onChange={onDataChange}
                required
              />

              <label className="mb-1 mt-3" for="exampleInputEmail1">
                Description
              </label>
              <textarea
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter Title"
                rows={"3"}
                value={blogData.content}
                name="content"
                onChange={onDataChange}
                required
              />
              <button
                className="mt-3 w-100 btn btn-success"
                disabled={isLoading}
              >
                {isLoading ? "Loading...." : "Create Blog"}
              </button>
            </form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default CreateBlog;
