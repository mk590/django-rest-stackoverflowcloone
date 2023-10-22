import React from "react";
import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";
import LeftSideBar from "../LeftSideBar/LeftSideBar";
import RightSideBar from "../RightSideBar/RightSideBar";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axiosInstance from "../../Interceptors/axios.js";
import "../Home/Home.css"
const Profile = () => {
  const { id } = useParams();
  const [questions, setquestions] = useState([]);
  let count = 0;
  const loadqutn=()=>{
    window.location.href = "/question";
  }
  useEffect(() => {
    axiosInstance.get("questions-list/")
      .then((response) => {
        setquestions(response.data);
        
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  function checkQuestion(event) {
    console.log(event);
    window.location.href = `/question/${event}/`;
  }
  function editQuestion(event) {
    console.log(event);
    window.location.href=`/question/${event}/update`;
    
  }
  const userQuestions = questions.filter((qustn) => qustn.user == id);
  console.log("Printing all his questions");
  console.log(userQuestions);
  return (
    <div>
      <Container fluid>
        <Row>
          <LeftSideBar />
          {/* This is the question list implemented */}
          <Col sm={8} className="mt-3">
            <Card className="p-3">
              <div className="container">
                <h1 className="title">Your Questions </h1>
                <button className="Questionbtn" onClick={loadqutn}>
                  Create Question
                </button>
              </div>
              {userQuestions.length === 0 ? (
                <Row>
                  <div>
                    Sorry But You have no Posts to Show, Please create a Post
                  </div>
                </Row>
              ) : (
                <Row>
                  {userQuestions.map((question) => (
                    <Col md={12} className="d-flex flex-row" key={question.id}>
                      <Card className="questioncard mb-3">
                        <Card.Body className="d-flex flex-column">
                          <div className="d-flex flex-row justify-content-between align-items-center">
                            <Card.Title>{question.title}</Card.Title>
                            <br />
                            <div>
                              <Badge variant="info" className="ml-2">
                                {question.upvotes} upvotes
                              </Badge>{" "}
                              <Badge variant="info" className="ml-2">
                                {question.downvotes} downvotes
                              </Badge>{" "}
                              {/* <Badge variant="info" className="ml-2">
                                {question.num_answers} answers
                              </Badge> */}
                            </div>
                          </div>
                          <Card.Text>{question.body}</Card.Text>
                          <span className="qustnInfo">
                            <Button
                              className="mr-2"
                              variant="success"
                              onClick={() => checkQuestion(question.id)}
                            >
                              View Question
                            </Button>{" "}
                            <Button
                              className="mr-2"
                              variant="success"
                              onClick={() => editQuestion(question.id)}
                              style={{marginLeft:"10px"}}
                            >
                              Edit Question
                            </Button>{" "}
                            <Badge className="tagBatch">{question.tags}</Badge>
                            <Badge className="author">
                              Author: {question.first_name}
                            </Badge>{" "}
                          </span>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              )}
            </Card>
          </Col>
          {/* Here we have implemented the right bar */}
          <RightSideBar />
        </Row>
      </Container>
    </div>
  );
};

export default Profile;
