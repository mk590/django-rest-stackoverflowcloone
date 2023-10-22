import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import axiosInstance from "src\Interceptors\axios.js";
import axiosInstance from "../../Interceptors/axios.js";
import { Container, Row, Col, Badge, Card, ListGroup } from "react-bootstrap";
import LeftSideBar from "../LeftSideBar/LeftSideBar";
import RightSideBar from "../RightSideBar/RightSideBar";
import "./QuestionDetail.css";

const tagNames = {
  1: "Django",
  2: "Heroku",
  3: "AWS",
  4: "GIT",
  5: "Github",
  6: "LTS",
  7: "ISRO",
};

const QuestionDetail = () => {
  const { id } = useParams();
  const myid = id;
  const [loading, setLoading] = useState(true);
  const [questions, setquestions] = useState([]);
  const [error, setError] = useState(null);
  const [user, setUser] = useState("");
  const [body, setbody] = useState("");
  const [anslist, setAnslist] = useState([]);
  const [visible, setVisible] = useState(false);
  const [commentb, setCommentb] = useState("");
  const [qcommentb, setqCommentb] = useState("");
  const [answer_id, setAnswer_id] = useState(null);
  const [commentAns, setcommentAns] = useState([]);
  const [commentansId, setcommentansId] = useState(null);
  const [qshowcomment, setqhowcomment] = useState(false);
  const [commentexist, setcommentexist] = useState(false);
  const [anscommentexist, setanscommentexist] = useState(false);
  const [qcommentAns, qsetcommentAns] = useState([]);

  const upVoteAnswer = (id, event) => {
    event.preventDefault();
    console.log(`Here is the answer id: ${id}`);
    console.log("Answer Upvoted");
    const data = { upvotes: 1 };

    axiosInstance
      .patch(`answer/view/${id}/`, data)
      .then((response) => {
        // console.log(response.data);
        window.location.href = `/question/${myid}`;
        // console.log("Yes it is done successfully " + myid);
      })
      .catch((error) => {
        console.log(error.response.data);
        throw error.response.data;
      });
  };

  const downVoteAnswer = (id, event) => {
    event.preventDefault();
    console.log(`Here is the answer id: ${id}`);
    console.log("Answer Downvoted");
    const data = { downvotes: 1 };

    axiosInstance
      .patch(`answer/view/${id}/`, data)
      .then((response) => {
        // console.log(response.data);
        // window.location.href = "/";
        window.location.href = `/question/${myid}`;
        // console.log("Yes it is done successfully " + myid);
      })
      .catch((error) => {
        console.log(error.response.data);
        throw error.response.data;
      });
  };

  const upVoteQuestion = (e) => {
    e.preventDefault();
    console.log("Question Upvoted");

    const data = { upvotes: 1 };

    axiosInstance.patch(`question/${id}/`, data)
      .then((response) => {
        // console.log(response.data);
        window.location.href = `/question/${id}`;
      })
      .catch((error) => {
        console.log(error.response.data);
        throw error.response.data;
      });
  };

  const downVoteQuestion = (e) => {
    e.preventDefault();
    console.log("Question downvoted");

    const data = { downvotes: 1 };

    axiosInstance.patch(`question/${id}/`, data)
      .then((response) => {
        // console.log(response.data);
        window.location.href = `/question/${id}`;
      })
      .catch((error) => {
        console.log(error.response.data);
        throw error.response.data;
      });
  };

  const onBodyChange = (e) => {
    setbody(e.target.value);
  };
  const onCommentChange = (e) => {
    setCommentb(e.target.value);
  };
  const onqCommentChange = (e) => {
    setqCommentb(e.target.value);
  };
  function createQComment(e) {
    e.preventDefault();

    const data = {
      body: qcommentb,
      question: myid
    };

    axiosInstance.post(
      `qcomment-create/`,
      data,
    )
      .then((response) => {
        // console.log(response.data);
        window.location.href = `/question/${myid}`;
      })
      .catch((error) => {
        alert("Not able to Comment!");
        console.log(error.response.data);
        throw error.response.data;
      });
  }
  // Handling the comment submission to a particular answer
  function createComment(e) {
    e.preventDefault();
    const token = localStorage.getItem("access_token");
    const data = { body: commentb, answer: answer_id };

    axiosInstance.post(`acomment-create/`, data)
      .then((response) => {
        // console.log(response.data);
        window.location.href = `/question/${myid}`;
      })
      .catch((error) => {
        console.log(error.response.data);
        throw error.response.data;
      });
  }
  // Handling the comment section and its visibility
  const handleCommentButtonClick = (id) => {
    setVisible((visible) => !visible);
    setAnswer_id(id);
    console.log("Here is the answeId: " + answer_id);
  };

  // Showing all the answers to the user of a particular answer
  const answerslist = () => {
    try {
      axiosInstance
        .get(`question/${id}/answers/`)
        .then((response) => {
          // console.log(response.data);
          setAnslist(response.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  // Getting the details of the signed in user for Answer creation and all
  // const getUserDetails = async () => {
  //   try {
  //     const response = await axiosInstance.get("user-detail/", {
  //       // headers,
  //       // ...options,
  //     });
  //     // console.log(response.data);
  //     const name = response.data.id;
  //     setUser(name);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // Function to handle the Submission of the answer posted by the user

  function getUserDetails() {
    axiosInstance
      .get("user-detail/")
      .then((response) => {
        // console.log(response.data);
        const name = response.data.id;
        setUser(name);
      })
      .catch((error) => {
        console.error(error);
      });
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    axiosInstance.post("answer/create/", {
      body: body,
      question: id,
    })
      .then((response) => {
        console.log("Data successfully posted to API!");
        window.location.href = `/question/${id}`;
      })
      .catch((error) => {
        alert("Couldn't upload the question");
        console.log("Error posting data to API:", error);
      });
  };

  const gettingComment = (aid) => {
    axiosInstance
      .get(`answer/${aid}/comments/`)
      .then((response) => {
        console.log("Here are the comments: ");
        console.log(response.data);
        setcommentAns(response.data);
        console.log("Just Show me some comments :- ");
        setcommentansId(aid);
        console.log(commentAns);
        // console.log(`Show me this answer ${commentAns[0].id}`);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  };

  const gettingQComment = () => {
    axiosInstance
      .get(`question/${id}/comments/`)
      .then((response) => {
        // console.log("Here is the comments:- ");
        qsetcommentAns(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // Gets all the Data required to be rendered here in this page
  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(`question/${id}/`)
      .then((response) => {
        console.log("Here are the questions: ");
        console.log(response.data);
        setquestions(response.data);
        getUserDetails();
        answerslist();

        console.log("Here is the user of this question");
        console.log(questions[0]);
      })
      .catch((error) => {
        console.log(error);
      }).finally(() => {
        setLoading(false);
      });
  }, []);

  // This Answers has all the Answers specific to a Question
  const Answers = anslist;
  Answers.sort((a, b) => b.upvotes - a.upvotes);
  console.log("Here is the answers list againxd:- ");
  console.log(Answers);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <Container fluid>
          <Row>
            <LeftSideBar />
            {/* This is the question list implemented */}
            <Col sm={8} className="mt-3">
              <div className="card mb-3 QuestionDiv">
                <div className="card-header">Question</div>
                <div className="card-body">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <h5 style={{ margin: 0 }} className="card-title">
                      {questions.title}
                    </h5>
                    <br />
                    <br />
                  </div>
                  <p className="card-text">{questions.body}</p>
                  <div>
                    {questions.image != null ? (
                      <img className="ImageField" src={questions.image} alt="" />
                    ) : null}
                  </div>

                  <div className="parent-div">
                    <div className="left-divv">
                      <button
                        className="btn btn-success"
                        onClick={upVoteQuestion}
                      >
                        {questions.upvotes} Upvotes
                      </button>{" "}
                      <button className="btn btn-dark" onClick={downVoteQuestion}>
                        {questions.downvotes} Downvotes
                      </button>{" "}
                      <button
                        className="btn btn-success"
                        onClick={() =>
                          setqhowcomment((qshowcomment) => !qshowcomment)
                        }
                      >
                        Create Comment
                        {qshowcomment}
                      </button>{" "}
                      {commentexist === false ? (
                        <button
                          className="btn btn-success"
                          onClick={() => {
                            setcommentexist((commentexist) => !commentexist);
                            gettingQComment();
                          }}
                        >
                          Show Comment
                        </button>
                      ) : (
                        <button
                          className="btn btn-light"
                          onClick={() => {
                            setcommentexist((commentexist) => !commentexist);
                            gettingQComment();
                          }}
                        >
                          Hide Comments
                        </button>
                      )}
                    </div>
                    <div className="right-divv">
                      {/* <a className="btn btn-primary m-lg-2">{questions.tags}</a> */}
                      <Badge className="tagsInfo" style={{ marginRight: "2px" }}>
                        {questions.tags &&
                          questions.tags.map((tag) =>
                            tagNames[tag] ? <span>{tagNames[tag]} </span> : null
                          )}
                      </Badge>
                      <Badge className="author">
                        Author: {questions.author.first_name}
                      </Badge>{" "}
                      <Badge>Created At: {questions.created_at} </Badge>
                    </div>
                  </div>
                  <div>
                    <hr />
                  </div>
                  <div>
                    {
                      <form
                        className="comment-form"
                        style={{ display: qshowcomment ? "block" : "none" }}
                      >
                        <label>Comment :</label>
                        <textarea
                          className="contentArea"
                          cols="30"
                          rows="10"
                          value={qcommentb}
                          onChange={onqCommentChange}
                        ></textarea>
                        <button
                          style={{ marginLeft: "20px" }}
                          className="btn btn-info mb-5"
                          type="submit"
                          onClick={createQComment}
                        >
                          Submit
                        </button>
                      </form>
                    }
                  </div>
                  <div>
                    {/* This is the showing comments of the question */}
                    {
                      <Card style={{ display: commentexist ? "block" : "none" }}>
                        <ListGroup variant="flush">
                          {qcommentAns.length === 0 ? (
                            <div>
                              <div>No comments found.</div>
                            </div>
                          ) : (
                            qcommentAns.map((comment) => (
                              <div>
                                <div
                                  style={{
                                    backgroundColor: "#AEC2B6",
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <div style={{ flex: 1 }}>
                                    <ListGroup.Item className="bodyComment">
                                      {comment.body}
                                    </ListGroup.Item>
                                  </div>{" "}
                                  <div
                                    className="commentInfo"
                                    style={{ flex: "0 0 auto" }}
                                  >
                                    <span>
                                      {" "}
                                      <strong>
                                        {comment.author.first_name}|{comment.created_at}
                                      </strong>
                                    </span>
                                  </div>
                                  <hr />
                                </div>
                                <hr />
                              </div>
                            ))
                          )}
                        </ListGroup>
                      </Card>
                    }
                  </div>
                </div>
              </div>

              <div className="card text-center mt-2 mb-3 ansSubmit">
                <div class="card-header">Featured</div>
                <div class="card-body">
                  <h5 class="card-title">Answer the Question</h5>
                  <form onSubmit={handleSubmit}>
                    <label>Body:</label>
                    <textarea
                      type="textfield"
                      value={body}
                      onChange={onBodyChange}
                      style={{ height: "20%", width: "80%" }}
                    />

                    <br />
                    <button className="btn btn-primary" type="submit">
                      Submit
                    </button>
                  </form>
                </div>
                <div class="card-footer text-muted">Contribute to Grow</div>
              </div>

              <div className="card mb-3 allAnsDiv">

                {Answers.length === 0 ? <div> No answers yet </div> : Answers.map((ans) => (
                  <>
                    <div key={ans.id}>
                      <div className="card-header">Answer</div>
                      <div className="card-body ansDiv">
                        <p className="card-text">{ans.body}</p>
                        <div className="parent-div">
                          <div className="buttonsDiv">
                            <button
                              className="btn btn-success "
                              onClick={(event) => upVoteAnswer(ans.id, event)}
                            >
                              {ans.upvotes} Upvotes
                            </button>{" "}
                            <button
                              className="btn btn-light"
                              onClick={(event) => downVoteAnswer(ans.id, event)}
                            >
                              {ans.downvotes} Downvotes
                            </button>{" "}
                            {anscommentexist === false ? (
                              <button
                                className="btn btn-secondary updwnBtn"
                                onClick={() => {
                                  gettingComment(ans.id);
                                  setanscommentexist(
                                    (anscommentexist) => !anscommentexist
                                  );
                                }}
                              >
                                Comments:{commentAns.length}
                              </button>
                            ) : (
                              <div>
                                <button
                                  className="btn btn-secondary updwnBtn"
                                  onClick={() => {
                                    gettingComment(ans.id);
                                    setanscommentexist(
                                      (anscommentexist) => !anscommentexist
                                    );
                                  }}
                                >
                                  Comments:{commentAns.length}
                                </button>
                                {commentAns.map((ansc) => (
                                  <div key={ansc.id}>
                                    <span>{ansc.body}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                          <div>
                            <Badge className="badgeStyleAns">
                              Author: {ans.author.first_name}
                            </Badge>{" "}
                            <Badge className="badgeStyle">
                              Created : {ans.created_at}
                            </Badge>{" "}
                          </div>
                        </div>


                      </div>
                      {/* Handling the comment section here */}
                      <div className="commentDiv">
                        <h5>Comment Section</h5>
                        <button
                          className="btn btn-dark"
                          onClick={() => handleCommentButtonClick(ans.id)}
                        >
                          Comment Here:{" "}
                        </button>
                        {answer_id === ans.id && (
                          <form
                            className="comment-form"
                            style={{ display: visible ? "block" : "none" }}
                          >
                            <label>Comment :</label>
                            <textarea
                              className="contentArea"
                              cols="30"
                              rows="10"
                              value={commentb}
                              onChange={onCommentChange}
                            ></textarea>
                            <button
                              style={{ marginLeft: "20px" }}
                              className="btn btn-info mb-5"
                              type="submit"
                              onClick={createComment}
                            >
                              Submit
                            </button>
                          </form>
                        )}
                      </div>
                      <hr className="hrDiffer" />
                    </div>
                  </>
                ))}
              </div>
            </Col>
            {/* Here we have implemented the right bar */}
            <RightSideBar />
          </Row>
        </Container>
      )}
    </div>
  );
};

export default QuestionDetail;
