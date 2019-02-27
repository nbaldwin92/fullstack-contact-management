import React, { Component } from "react";
import PropTypes from "prop-types";
import { MDBBtn } from "mdbreact";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          textAlign: "center"
        }}
      >
        <div className="row">
          <div style={{ textAlign: "center" }}>
            <h4>
              <b>Hey there,</b> {user.name.split(" ")[0]}
              <p className="flow-text grey-text text-darken-1">
                Congrats! You are logged in{" "}
                <span role="img" aria-label="clap">
                  👏
                </span>
              </p>
            </h4>
            <MDBBtn color="primary" size="md" onClick={this.onLogoutClick}>
              Logout
            </MDBBtn>
            <Link to="/contacts">
              <MDBBtn color="secondary" size="md">
                Another Page
              </MDBBtn>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
