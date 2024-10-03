import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import { notifyDanger } from "../actions/customFn";
import Header from "../components/Header";

const BlogList = () => {
  const navigate = useNavigate();

  const [allBlogs, setAllBlogs] = useState([]);

  const getAllBlogs = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth")}`,
      },
    };
    const url = "/blog/get-all-blogs";
    axios
      .get(url, config)
      .then((res) => {
        const { data } = res.data;
        setAllBlogs(data);
      })
      .catch((err) => {
        console.log(err);
        notifyDanger(
          err.response.data.message || err.response || "Some error occured"
        );
      });
  };

  useEffect(() => {
    getAllBlogs();
  }, []);
  return (
    <>
    <Header />
    <div className="container mt-5">
      <div className="d-flex justify-content-between mb-2">
        <h3>Blog List</h3>
        <button
          className="btn btn-success"
          onClick={() => navigate("/create-blog")}
        >
          Create Blog
        </button>
      </div>
      <div className="row">
        {allBlogs.map((data, i) => {
          return (
            <div className="col-3 mt-3" key={i}>
              <Card style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj1cbtHrCxTGHJ4la-6fBeY670i0Drg92lUg&s"
                />
                <Card.Body>
                  <Card.Title>{data.title}</Card.Title>
                  <Card.Text style={{ height: "80px", overflow: "hidden" }}>
                    {data.content}
                  </Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => navigate(`/blog-description/${data._id}`)}
                  >
                    View
                  </Button>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
    </>
  );
};

export default BlogList;
