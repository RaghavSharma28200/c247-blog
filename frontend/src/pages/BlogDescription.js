import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../axios";
import { notifyDanger, notifySuccess } from "../actions/customFn";
import { useSelector } from "react-redux";
import Header from "../components/Header";

const BlogDescription = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [blog, setBlog] = useState({
    title: "",
    content: "",
  });

  const profileData = useSelector((state) => state.profileData.userData);

  const [allBlogData, setAllBlogData] = useState({});
  const [lockLoading, setLockLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();

  const onDataChange = (e) => {
    const { value, name } = e.target;
    setBlog({ ...blog, [name]: value });
  };

  const getBlog = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth")}`,
      },
    };
    const url = `/blog/get-blog/${id}`;
    axios
      .get(url, config)
      .then((res) => {
        const { data } = res.data;
        setBlog({
          title: data.title,
          content: data.content,
        });
        setAllBlogData(data);
      })
      .catch((err) => {
        console.log(err);
        notifyDanger(
          err.response.data.message || err.response || "Some error occured"
        );
      });
  };

  useEffect(() => {
    getBlog();
  }, [id, isUpdate]);

  const updateblog = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth")}`,
      },
    };
    const url = `/blog/update-blog`;
    const data = {
      title: blog.title,
      content: blog.content,
      lastEditedBy: profileData._id,
      isLocked: false,
      id,
    };
    axios
      .put(url, data, config)
      .then((res) => {
        const { message } = res.data;
        notifySuccess(message);
        setIsUpdate((p) => !p);
        setIsLoading(false);
        setIsEdit(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        notifyDanger(
          err.response.data.message || err.response || "Some error occured"
        );
      });
  };

  const asyncLockBlog = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth")}`,
      },
    };
    const url = `/blog/blog-lock`;
    const data = {
      isLocked: true,
      lockedBy: profileData._id,
      id,
    };
    axios
      .put(url, data, config)
      .then((res) => {
        const { message } = res.data;
        notifySuccess("blog locked!");
        setIsEdit(true);
        setLockLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLockLoading(false);
        notifyDanger(
          err.response.data.message || err.response || "Some error occured"
        );
      });
  };

  const asyncUnLockBlog = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth")}`,
      },
    };
    const url = `/blog/blog-lock`;
    const data = {
      isLocked: false,
      lockedBy: profileData._id,
      id,
    };
    axios
      .put(url, data, config)
      .then((res) => {
        const { message } = res.data;
        notifySuccess("blog unlocked!");
        setIsEdit(false);
      })
      .catch((err) => {
        console.log(err);
        notifyDanger(
          err.response.data.message || err.response || "Some error occured"
        );
      });
  };

  const blogLock = () => {
    setLockLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth")}`,
      },
    };
    const url = `/blog/get-blog/${id}`;
    axios
      .get(url, config)
      .then((res) => {
        const { data } = res.data;
        if (data.isLocked && data.lockedBy === profileData._id) {
          asyncLockBlog();
        } else if (data.isLocked) {
          notifyDanger("someone is allready editing the blog");
          setLockLoading(false);
        } else {
          asyncLockBlog();
          setLockLoading();
        }
      })
      .catch((err) => {
        console.log(err);
        notifyDanger(
          err.response.data.message || err.response || "Some error occured"
        );
      });
  };

  const [isLocked, setIsLocked] = useState(true);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());

  const inactivityLimit = 60000;

  useEffect(() => {
    const handleUserActivity = () => {
      setLastActivityTime(Date.now());
      if (isLocked) {
        setIsLocked(false);
      }
    };
    const handleTimeout = () => {
      if (Date.now() - lastActivityTime > inactivityLimit) {
        setIsLocked(true);
      }
    };
    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keypress", handleUserActivity);
    window.addEventListener("click", handleUserActivity);
    const interval = setInterval(handleTimeout, 1000);
    return () => {
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keypress", handleUserActivity);
      window.removeEventListener("click", handleUserActivity);
      clearInterval(interval);
    };
  }, [isLocked, lastActivityTime]);

  useEffect(() => {
    if (isLocked && isEdit) {
      asyncUnLockBlog();
    }
  }, [isLocked]);

  return (
    <>
    <Header />
    <div className="container mt-5">
      {isEdit ? (
        <>
          <form onSubmit={updateblog}>
            <div className="mb-2 d-flex justify-content-between">
              <h3>Edit Blog</h3>
              <button className="btn btn-success" disabled={isLoading}>
                {isLoading ? "Loading" : "Update Blog"}
              </button>
            </div>
            <label className="mb-1" for="exampleInputEmail1">
              Title
            </label>
            <input
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Title"
              value={blog.title}
              name="title"
              required
              onChange={onDataChange}
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
              value={blog.content}
              name="content"
              required
              onChange={onDataChange}
            />
          </form>
        </>
      ) : (
        <>
          <div className="mb-2 d-flex justify-content-between">
            <h3>Blog Description</h3>
            <button
              className="btn btn-success"
              onClick={blogLock}
              disabled={lockLoading}
            >
              {lockLoading ? "Loading..." : "Edit Blog"}
            </button>
          </div>
          <div className="mt-3">
            <h5>{blog.title}</h5>
            <p>{blog.content}</p>
          </div>
        </>
      )}
    </div>
    </>
  );
};

export default BlogDescription;
