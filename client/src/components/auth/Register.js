import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from "mdbreact";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              Back to home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Register</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </div>
            <MDBContainer>
              <MDBRow>
                <MDBCol md="6">
                  <form>
                    <p className="h5 text-center mb-4">Sign up</p>
                    <div className="grey-text">
                      <MDBInput
                        label="Name"
                        icon="user"
                        group
                        type="text"
                        validate
                        error="wrong"
                        success="right"
                        id="name"
                        onChange={this.onChange}
                        value={this.state.name}
                      />
                      <MDBInput
                        label="Your email"
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
                        label="Your password"
                        icon="lock"
                        group
                        type="password"
                        id="password"
                        validate
                        onChange={this.onChange}
                        value={this.state.password}
                      />
                      <MDBInput
                        label="Confirm your password"
                        icon="exclamation-triangle"
                        group
                        type="password"
                        validate
                        error="wrong"
                        success="right"
                        id="password2"
                        onChange={this.onChange}
                        value={this.state.password2}
                      />
                    </div>
                    <div className="text-center">
                      <MDBBtn color="primary" onClick={this.onSubmit}>
                        Register
                      </MDBBtn>
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

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
