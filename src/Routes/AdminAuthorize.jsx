import React from "react";
import { Navigate } from "react-router-dom";

function AdminAuthorize(props) {
  console.log(
    "admin ls - ",
    typeof localStorage.getItem("admin"),
    localStorage.getItem("admin")
  );
  if (localStorage.getItem("admin").token !== "null") {
    return props.children;
  } else {
    return <Navigate to={"/"} replace={true} />;
  }
}

export default AdminAuthorize;
