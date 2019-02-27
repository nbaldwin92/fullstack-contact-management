import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <div className="navbar-fixed">
        <nav className="z-depth-0">
          <div className="nav-wrapper white">
            <Link
              to="/dashboard"
              style={{
                display: "flex",
                justifyContent: "center",
                fontFamily: "monospace",
                fontSize: 18
              }}
              className="black-text"
            >
              MERN
            </Link>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
