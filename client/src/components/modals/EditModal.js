import React, { Component } from "react";
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBIcon
} from "mdbreact";

class EditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal14: false,
      name: this.props.name
    };
  }

  editContact = () => {
    alert("edit contact. New name: " + this.state.name);
    alert(this.props.objectId);
  };

  onChange = e => {
    this.setState({ name: e.target.value });
  };

  toggle = nr => () => {
    let modalNumber = "modal" + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber]
    });
  };

  render() {
    return (
      <div>
        <MDBIcon
          style={{ float: "right" }}
          onClick={this.toggle(14)}
          icon="edit"
          className="blue-text"
        />

        <MDBContainer>
          <MDBModal
            isOpen={this.state.modal14}
            toggle={this.toggle(14)}
            centered
          >
            <MDBModalHeader toggle={this.toggle(14)}>
              Edit Contact
            </MDBModalHeader>
            <MDBModalBody>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={this.state.name}
                  onChange={this.onChange}
                />
              </div>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={this.toggle(14)}>
                Close
              </MDBBtn>
              <MDBBtn
                onClick={() => {
                  this.editContact();
                }}
                color="primary"
              >
                Save changes
              </MDBBtn>
            </MDBModalFooter>
          </MDBModal>
        </MDBContainer>
      </div>
    );
  }
}

export default EditModal;
