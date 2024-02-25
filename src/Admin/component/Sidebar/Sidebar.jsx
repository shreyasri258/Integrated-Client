import PropTypes from "prop-types";
import React from "react";

function Sidebar({ children }) {
  return (
    <aside className="flex flex-col bg-indigo-100  fixed top-20 left-0 bottom-0 w-64 shadow-md">
      {children}
    </aside>
  );
}

Sidebar.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Sidebar;
