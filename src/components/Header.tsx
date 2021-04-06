import React from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <div className="page-layout header">
      <Link to="/">Main</Link>
      <Link to="/create">Create Post</Link>
      <Link to="/search">Search Post</Link>
    </div>
  );
};
