import PropTypes from "prop-types";
import React from "react";
import { Link, useLocation } from "react-router-dom";

function SidebarItem({
  type,
  content,
  selectedIcon,
  unselectedIcon,
  icon,
  info,
  label,
  to,
}) {
  // types: title, info, setting, link
  const { pathname } = useLocation();

  if (type === "title") {
    return <div className="text-lg text-indigo-500 p-2 py-3">{content}</div>;
  }

  if (type === "info") {
    return (
      <div className="flex items-center p-2 justify-between ">
        <div className="flex">
          <span className="">{icon}</span>
          <span className="text-base px-2 text-indigo-600">{label}</span>
        </div>
        <span className="px-2 text-sm text-white bg-indigo-500 rounded-full justify-self-end ">
          {info}
        </span>
      </div>
    );
  }

  if (type === "link") {
    const pathArray = pathname.split("/");
    const currentPage = pathArray[pathArray.length - 1];
    const isCurrentPage = currentPage === to;

    return (
      <Link to={to}>
        <div
          className={`flex p-2 ${
            isCurrentPage && "bg-indigo-300"
          } hover:bg-indigo-300 hover:text-white rounded-md transition-all items-center duration-300 ease-in-out`}
        >
          {isCurrentPage ? (
            <span className="text-slate-100">{selectedIcon}</span>
          ) : (
            <span className="text-slate-100">{unselectedIcon}</span>
          )}

          <span
            className={`px-2 text-base ${
              isCurrentPage ? "text-slate-50" : "text-indigo-600"
            } `}
          >
            {label}
          </span>
        </div>
      </Link>
    );
  }
}

SidebarItem.propTypes = {
  type: PropTypes.oneOf(["title","info" ,"link"]).isRequired,
  content: PropTypes.string,
  selectedIcon: PropTypes.node,
  unselectedIcon: PropTypes.node,
  icon: PropTypes.node,
  info: PropTypes.string,
  label: PropTypes.string,
  to: PropTypes.string,
};

export default SidebarItem;
