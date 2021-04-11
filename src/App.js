import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";
import FileUpload from  './components/FileUpload';

import Homepage from './components/Homepage'


import { login, logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from "./helpers/history";

import StudentSignup from './components/StudentSignup'
import StudentSignin from './components/StudentLogin'

import StudentBoard from  './components/studentBoard'
import MentorBoard from  './components/MentorBoard'
import MentorMessageComponent from './components/MentorMessages'
import MentorSignup from './components/MentorSignup'

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  const [showstudentBoard, setShowStudentBoard] = useState(false);

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
      setShowStudentBoard(currentUser.roles.includes("ROLE_STUDENT"))
    
    }
  }, [currentUser]);

  const logOut = () => {
    dispatch(logout());
  };

  return (
    <Router history={history}>
      <div>









        {/* <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            OpenBook
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )}

{showstudentBoard && (
              <li className="nav-item">
                <Link to={"/StudentBoard"} className="nav-link">
                     StudentBoard
                </Link>
              </li>
            )}





            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            )}
          </div>







          

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/FileUpload"} className="nav-link">
                  Upload 
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/personaldata"} className="nav-link">
                 personaldata 
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/studentregister"} className="nav-link">
                  Student Sign Up
                </Link>
              </li>

              {/* <li className="nav-item">
                <Link to={"/studentlogin"} className="nav-link">
                 Student login
                </Link>
              </li> */}

            {/* </div> */}
          {/* )} */}
        {/* </nav> */} 


        <>

        {/* {currentUser && (
              <MentorBoard />
            )} */}

{/* 
{showstudentBoard && (
              <>

              <StudentBoard />
              </>
            )} */}
        </>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home","/openBookApp"]} component={Login} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} />
            <Route path="/FileUpload" component={FileUpload} />

           
            <Route path="/studentregister" component={StudentSignup} />

            {/* <Route path="/StudentBoard" component={StudentBoard} /> */}
            
            {/* <Route path="/MentorBoard" component={MentorBoard} /> */}
            <Route path="/homepage" component={Homepage} />
            {/* <Route path="/mentormessages" component={MentorMessageComponent} /> */}

<Route path='/mentorsignup' component={MentorSignup} />
            {/* <Route path="/studentlogin" component={StudentSignin} /> */}



          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
