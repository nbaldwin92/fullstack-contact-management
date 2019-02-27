import React, { Component } from "react";
import {
  MDBBtn,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBIcon
} from "mdbreact";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import axios from "axios";

class Contacts extends Component {
  constructor() {
    super();
    this.state = {
      contact: "",
      list: []
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
      <MDBTable striped>
        <MDBTableHead>
          <tr>
            <th>Name</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {this.state.list.map(list => (
            <tr key={list._id}>
              <td key={list._id}>{list.contact}</td>
              <td key={list.contact}>
                <MDBIcon
                  key={list.addedBy}
                  icon="trash-alt"
                  className="red-text"
                  onClick={() => {
                    this.removeContact(list._id);
                  }}
                />
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
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
