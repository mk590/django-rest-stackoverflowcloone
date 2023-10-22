import { useState,useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import LeftSideBar from "../LeftSideBar/LeftSideBar";
import RightSideBar from "../RightSideBar/RightSideBar";
import axiosInstance from "../../Interceptors/axios.js";
import "./Question.css";

const options = [
  { id: "1", name: "Django" },
  { id: "2", name: "Heroku" },
  { id: "3", name: "AWS" },
  { id: "4", name: "GIT" },
  { id: "5", name: "Github" },
  { id: "6", name: "LTS" },
  { id: "7", name: "ISRO" },
];
const Question = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [user, setUser] = useState("");
  const [tags, setTags] = useState([]);
  const [image, setimage] = useState(null);

  const handleChange = (e) => {
    const options = e.target.options;
    const selectedValues = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
           const value = options[i].value;
           selectedValues.push(Number(value));
      }
    }
    console.log("Here are the values");
    console.log(selectedValues);
    setTags(selectedValues);
  };
  // const getUserDetails = async () => {
  //   // const token = localStorage.getItem("access_token");
  //   // const headers = {
  //   //   Authorization: `Bearer ${token}`,
  //   // };
  //   // const options = {
  //   //   withCredentials: true, // add withCredentials option if API requires authentication
  //   // };

  //   try {
  //     const response = await axiosInstance.get("user-detail/", {
  //       // headers,
  //       // ...options,
  //     });
  //     console.log(response.data);
  //     const name = response.data.id;
  //     setUser(name);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };


  useEffect(() => {
    const fetchUserDetails = () => {
      axiosInstance.get("user-detail/")
        .then(response => {
          console.log(response.data);
          const name = response.data.id;
          setUser(name);
        })
        .catch(error => {
          console.error(error);
        });
    };
    // This version of the function uses the .then() method to handle the response and .catch() to handle errors. The functionality remains the same, and it fetches user details from the API and updates the component's state with the data or handles errors accordingly.
    
    
    
    
    
    

    fetchUserDetails(); // Call the function when the component mounts
  }, []); // The empty dependency array [] ensures this effect runs once


  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };
  // const handleTagsChange = (event) => {
  //   const selectedTags=Array.from(event.target.selectedOptions,(option)=>option.value);
  //   setTags(selectedTags);
  // };
  const handleImageChange = (event) => {
    setimage(event.target.files[0]);
    // getUserDetails();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    formData.append("user", user);
    if(image!=null){

      formData.append("image", image);
    }
    formData.append("tags", tags);
    console.log("Here are the data:- "+formData);
    try {
      axiosInstance
        .post("question-create/", formData,{
          headers: {
            'Content-Type': 'multipart/form-data',
            // 'Accept': 'multipart/form-data',
          }},)
        .then((response) => {
          console.log("Data successfully posted to API!");
          window.location.href = "/";
        });
    } catch (error) {
      alert("Couldn't upload the question");
      console.log("Error posting data to API:", error);
      console.log("Here are the data:- " + formData);
    }
  };
  return (
    <div>
      <Container fluid>
        <Row>
          <LeftSideBar />
          {/* This is the question list implemented */}
          <Col sm={8} className="mt-5">
            <h1>Create a Question</h1>
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
                <div className="mt-2">
                  <label> Image: </label>
                  <input
                    type="file"
                    name="image"
                    accept="image/jpeg,image/png,image/gif"
                    onChange={handleImageChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="tags">Select Tags: </label>
                  <select
                    multiple
                    className="form-control"
                    id="tags"
                    value={tags}
                    onChange={handleChange}
                    required
                  >
                    {options.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>
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
  );
};

export default Question;
