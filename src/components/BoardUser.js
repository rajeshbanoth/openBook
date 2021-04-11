import Axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import UserService from "../services/user.service";

const BoardUser = () => {

  const { user: currentUser } = useSelector((state) => state.auth);
  const [content, setContent] = useState("");





  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
    </div>
  );
};

export default BoardUser;
