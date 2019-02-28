import React, { Component } from "react";
import ReactDOM from "react-dom";

import {
  MDBBtn,
  MDBIcon,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBCol,
  MDBRow,
  MDBContainer
} from "mdbreact";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import EditModal from "../modals/EditModal";

import axios from "axios";

class Contacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contact: "",
      list: [],
      modal14: false
    };
  }

  componentDidMount() {
    this.updateList();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  updateList = () => {
    axios
      .get("/api/contact/getcontacts", {
        params: {
          addedBy: this.props.auth.user.id
        }
      })
      .then(res => {
        this.setState({ list: res.data });
      })
      .catch(res => {
        console.log(res);
      });
  };

  removeContact = key => {
    axios
      .delete("/api/contact/removecontact", {
        data: {
          id: key
        }
      })
      .then(res => {})
      .catch(res => {
        console.log(res);
      });
    this.updateList();
  };

  onChange = e => {
    this.setState({ contact: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    if (this.state.contact === "") {
      alert("Please enter a contact");
      return;
    }

    const currentUser = this.props.auth.user.id;

    const newContact = {
      addedBy: currentUser,
      contact: this.state.contact,
      date: Date.now()
    };

    axios.post("/api/contact/addcontact", newContact).then(res => {});

    this.setState({
      contact: ""
    });
    this.updateList();
  };

  render() {
    const { user } = this.props.auth;

    const elementToRender = this.state.list.length ? (
      <div>
        <MDBRow>
          {this.state.list.map(list => (
            <MDBCol key={list.contact}>
              <MDBCard key={list._id} style={{ width: "22rem" }}>
                <MDBCardImage
                  key={list.date}
                  className="img-fluid"
                  src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg"
                  waves
                />
                <MDBCardBody>
                  <MDBCardTitle>{list.contact}</MDBCardTitle>
                  <MDBCardText>Added on: {list.date}</MDBCardText>
                  <div style={{ float: "left" }}>
                    <MDBIcon
                      key={list.addedBy}
                      icon="trash-alt"
                      className="red-text"
                      onClick={() => {
                        this.removeContact(list._id);
                      }}
                    />
                  </div>
                  <EditModal name={list.contact} objectId={list._id} />
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          ))}
        </MDBRow>
      </div>
    ) : (
      <p>You have no contacts!</p>
    );

    return (
      <div>
        <div className="form-group">
          <label>Add contact</label>
          <input
            type="text"
            className="form-control"
            id="contacts"
            value={this.state.contact}
            onChange={this.onChange}
          />
          <MDBBtn color="secondary" size="md" onClick={this.onSubmit}>
            Submit
          </MDBBtn>
          <div>
            <p>{user.name.split(" ")[0]}'s Contacts: </p>
            {elementToRender}
          </div>
        </div>
      </div>
    );
  }
}

Contacts.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps)(Contacts);
