import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";

import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  render() {
    return (
      <div className="container">
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              Back to home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Login</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>

            <MDBContainer>
              <MDBRow>
                <MDBCol md="6">
                  <form>
                    <p className="h5 text-center mb-4">Sign in</p>
                    <div className="grey-text">
                      <MDBInput
                        label="Type your email"
                        icon="envelope"
                        group
                        type="email"
                        validate
                        error="wrong"
                        success="right"
                        id="email"
                        onChange={this.onChange}
                        value={this.state.email}
                      />
                      <MDBInput
                        label="Type your password"
                        icon="lock"
                        group
                        type="password"
                        id="password"
                        validate
                        onChange={this.onChange}
                        value={this.state.password}
                      />
                    </div>
                    <div className="text-center">
                      <MDBBtn onClick={this.onSubmit}>Login</MDBBtn>
                    </div>
                  </form>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
