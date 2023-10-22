import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../Interceptors/axios.js";
import { Container, Row, Col } from "react-bootstrap";
import LeftSideBar from "../LeftSideBar/LeftSideBar";
import RightSideBar from "../RightSideBar/RightSideBar";
import "./Question.css";

const UpdateQuestion = () => {
  const { id } = useParams();
  const [title, settitle] = useState("");
  const [body, setbody] = useState("");
  const [tags, settags] = useState("");
  console.log("Here is the id of the question : " + id);

  const handleTitleChange = (event) => {
    settitle(event.target.value);
  };

  const handleBodyChange = (event) => {
    setbody(event.target.value);
  };
  const handleTagsChange = (event) => {
    settags(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Question Upvoted");
    
    axiosInstance.patch(
          `question/${id}/`,
          {
            title: title,
            body: body,
            tags: tags,
          },
        )
        .then((response) => {
          console.log("Data successfully posted to API!");
          window.location.href = "/";
        })
        .catch((error) => {
          alert("Couldn't upload the question");
          console.log("Error posting data to API:", error);
        });
  };

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const res = await axiosInstance.get(
          `question/${id}/`
        );
        console.log(res.data);
        settitle(res.data.title);
        setbody(res.data.body);
      } catch (error) {
        alert("Not able to fetch the data");
      }
    };
    fetchQuestion();
  }, []);

  return (
    <>
      <div>
        <Container fluid>
          <Row>
            <LeftSideBar />
            {/* This is the question list implemented */}
            <Col sm={8} className="mt-5">
              <h1>Editing a Question</h1>
              <div className="formDiv">
                <form onSubmit={handleSubmit}>
                  <div class="form-group">
                    <label for="exampleFormControlInput1">Title :</label>
                    <input
                      type="text"
                      class="form-control input-sm"
                      value={title}
                      onChange={handleTitleChange}
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label for="exampleFormControlTextarea1">Body :</label>
                    <textarea
                      class="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      type="textfield"
                      value={body}
                      onChange={handleBodyChange}
                      required
                    ></textarea>
                  </div>
                  
                  <div className="mt-5">
                    <button class="btn btn-success btn-lg" type="submit">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </Col>
            {/* Here we have implemented the right bar */}
            <RightSideBar />
          </Row>
        </Container>
      </div>
    </>
  );
};

export default UpdateQuestion;
