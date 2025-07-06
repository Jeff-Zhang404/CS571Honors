
import React from "react";
import "./NavBar.css";

export default function NavBar() {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <a href="#">About</a>
        <a href="#">FAQ</a>
      </div>
      <div className="nav-right">
        <a href="#">Home</a>
        <a href="#">Saved Courses</a>
        <a href="#">Log in</a>
        <a href="#">Sign up</a>
      </div>
    </nav>
  );
}
