import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from './Components/Navbar/Navbar.jsx'
import Home from './Components/Home/Home.jsx'
import Register from './Components/Register/Register.jsx'
import Login from "./Components/Login/Login.jsx";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Question from "./Components/Question/Question.jsx"
import Logout from "./Components/Login/Logout"
import QuestionDetail from "./Components/QuestionDetail/QuestionDetail"
import Profile from "./Components/Profile/Profile.jsx"
import UpdateQuestion from "./Components/Question/UpdateQuestion.jsx"
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute"

function App(){
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="question" element=
          {
          <PrivateRoute>
            <Question />
          </PrivateRoute>
          } />
          <Route path="question/:id" element={
            <PrivateRoute>
          <QuestionDetail />
          </PrivateRoute>
          } />
          <Route path="question/:id/update" element={
          <PrivateRoute>
          <UpdateQuestion />
          </PrivateRoute>
          } />
          <Route path="logout" element={
          <PrivateRoute>
          <Logout />
          </PrivateRoute>
          } />
          <Route path="profile/:id" element={
          <PrivateRoute>
          <Profile />
          </PrivateRoute>
          } />
        </Routes>
      </Router>
    </>
  );
}

export default App