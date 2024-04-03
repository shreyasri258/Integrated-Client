import React from "react";
import { Navigate } from "react-router-dom";

function UserAuthorize(props) {
  if (localStorage.getItem("user").token!=='null') {
    return props.children;
  } else {
    return <Navigate to={"/"} />;
  }
}

export default UserAuthorize;
