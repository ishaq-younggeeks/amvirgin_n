import React, { Component } from "react";
import Header from "../../../entertainment/modules/Header";
import SubMenu from "../Home/components/SubMenu";
import Footer from "../../../entertainment/modules/Footer";
import "./Profile.css";
import Modal from "react-modal";
import { connect } from "react-redux";
import { editPassword, editUsername } from "./ProfileAction";

class EditProfile extends Component {
  constructor() {
    super();
    this.state = {
      modalIsOpen1: false,
      modalIsOpen2: false,
      username: "",
      usernameError: "",
      oldpwd: "",
      newpwd: "",
      cnewpwd: "",
      oldpwdError: "",
      newpwdError: "",
      cnewpwdError: "",
      hiddenPassword1: false,
      hiddenPassword2: false,
      hiddenPassword3: false,
    };
  }

  hiddenPasswordHandler1 = () => {
    this.setState({
      hiddenPassword1: !this.state.hiddenPassword1,
    });
  };

  hiddenPasswordHandler2 = () => {
    this.setState({
      hiddenPassword2: !this.state.hiddenPassword2,
    });
  };

  hiddenPasswordHandler3 = () => {
    this.setState({
      hiddenPassword3: !this.state.hiddenPassword3,
    });
  };

  openModal1 = () => {
    this.setState({
      modalIsOpen1: true,
    });
  };

  openModal2 = () => {
    this.setState({
      modalIsOpen2: true,
    });
  };

  closeModal1 = () => {
    this.setState({
      modalIsOpen1: false,
    });
  };

  closeModal2 = () => {
    this.setState({
      modalIsOpen2: false,
    });
  };

  customStyles = {
    content: {
      top: "40%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  handleUsernameChange = (e) => {
    e.preventDefault();
    this.setState({
      username: e.target.value,
    });
  };

  handlePasswordChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  validateUsernameForm = () => {
    let usernameError = "";
    if (!this.state.username.trim()) {
      usernameError = "Field cannot be blank!";
    }

    if (usernameError) {
      this.setState({
        usernameError,
      });
      return false;
    }
    return true;
  };

  handleNewUsernameSubmit = (e) => {
    e.preventDefault();
    let isValid = this.validateUsernameForm();
    if (isValid) {
      let username = this.state.username;
      this.props.editUsername(username);
      this.setState({
        username: "",
        usernameError: "",
      });
    }
  };

  validatePasswordForm = () => {
    let oldpwdError = "";
    let newpwdError = "";
    let cnewpwdError = "";
    if (!this.state.oldpwd.trim()) {
      oldpwdError = "Field cannot be blank!";
    }

    if (!this.state.newpwd.trim()) {
      newpwdError = "Field cannot be blank!";
    }

    if (!this.state.cnewpwd.trim()) {
      cnewpwdError = "Field cannot be blank!";
    } else if (this.state.newpwd != this.state.cnewpwd) {
      cnewpwdError = "Passwords do not match!";
    }

    if (oldpwdError || newpwdError || cnewpwdError) {
      this.setState({
        oldpwdError,
        newpwdError,
        cnewpwdError,
      });
      return false;
    }
    return true;
  };

  handlePasswordChangeSubmit = (e) => {
    e.preventDefault();
    let isValid = this.validatePasswordForm();
    if (isValid) {
      let pass1 = this.state.oldpwd;
      let pass2 = this.state.newpwd;
      let pass3 = this.state.cnewpwd;
      this.props.editPassword(pass1, pass2, pass3);
      this.setState({
        username: "",
        oldpwd: "",
        newpwd: "",
        cnewpwd: "",
        oldpwdError: "",
        newpwdError: "",
        cnewpwdError: "",
      });
    }
  };

  render() {
    let email = localStorage.getItem("email");
    let mobile = localStorage.getItem("mobile");
    let username = localStorage.getItem("name");
    const { usernameChangeRes, passwordChangeRes } = this.props;
    return (
      <div className="shopMain">
        <Header />
        <SubMenu {...this.props} />
        <div>
          <div
            className="card"
            style={{ margin: "2rem 0 0 2rem", width: "28rem" }}
          >
            <h3>Account Details: </h3>
            <div class="card-header">Email :</div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">{email}</li>
            </ul>
            <div class="card-header">Mobile :</div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">{mobile}</li>
            </ul>
            <div class="card-header">Username :</div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                {username}{" "}
                <a
                  href="#"
                  style={{ marginLeft: "15px", color: "red" }}
                  onClick={() => this.setState({ modalIsOpen1: true })}
                >
                  Change Username?
                </a>
              </li>
            </ul>
            <div class="card-header">
              Password :
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">********{" "} <a
                href="#"
                style={{ marginLeft: "63px", color: "red" }}
                onClick={() => this.setState({ modalIsOpen2: true })}
              >
                Change Password?
              </a></li>
            </ul>
          </div>
          <hr />
        </div>
        <Footer />
        <Modal
          isOpen={this.state.modalIsOpen1}
          onRequestClose={this.closeModal1}
          style={this.customStyles}
          ariaHideApp={false}
        >
          <h4 style={{ color: "#ce3838" }}>Please Enter New Username :</h4>
          <hr style={{ color: "#ce3838", borderColor: "#ce3838" }} />
          <form noValidate onSubmit={this.handleNewUsernameSubmit}>
            <lable htmlFor="username" className="username">
              New Username:{" "}
            </lable>
            <input
              type="text"
              id="username"
              placeholder="Username"
              autoFocus
              onChange={this.handleUsernameChange}
              value={this.state.username}
              required
            />
            <p style={{ color: "red" }}>{this.state.usernameError}</p>
            <button
              style={{
                padding: "5px 25px 5px 25px",
                backgroundColor: "#ce3838",
                color: "white",
                borderRadius: "5px",
                border: "none",
                marginTop: "30px",
              }}
              type="submit"
            >
              Submit
            </button>
          </form>
          {usernameChangeRes ? (
            <p style={{ color: "#ce3838" }}>{usernameChangeRes}</p>
          ) : null}
        </Modal>

        <Modal
          isOpen={this.state.modalIsOpen2}
          onRequestClose={this.closeModal2}
          style={this.customStyles}
          ariaHideApp={false}
        >
          <h4 style={{ color: "#ce3838" }}>Change Password :</h4>
          <hr style={{ color: "#ce3838", borderColor: "#ce3838" }} />
          <form noValidate onSubmit={this.handlePasswordChangeSubmit}>
            <div className="mb-3">
              <label htmlFor="oldpwd" className="oldpwd">
                Current Password:{" "}
              </label>
              <div className="input-group">
                <input
                  className="form-control"
                  type={this.state.hiddenPassword1 ? "text" : "password"}
                  id="oldpwd"
                  placeholder="Type Current Password"
                  autoFocus
                  name="oldpwd"
                  onChange={this.handlePasswordChange}
                  value={this.state.oldpwd}
                />
                {this.state.hiddenPassword1 ? (
                  <span
                    className="input-group-text eye"
                    onClick={this.hiddenPasswordHandler1}
                  >
                    <span
                      className="fa fa-eye"
                      aria-hidden
                      style={{ fontSize: "17px" }}
                    ></span>
                  </span>
                ) : (
                  <span
                    className="input-group-text eye"
                    onClick={this.hiddenPasswordHandler1}
                  >
                    <i
                      className="fa fa-eye-slash"
                      aria-hidden
                      style={{ fontSize: "17px" }}
                    ></i>
                  </span>
                )}
              </div>
              <p style={{ color: "red" }}>{this.state.oldpwdError}</p>
            </div>
            <div className="mb-3">
              <label htmlFor="oldpwd" className="newpwd">
                New Password:{" "}
              </label>
              <div className="input-group">
                <input
                  type={this.state.hiddenPassword2 ? "text" : "password"}
                  id="newpwd"
                  className="form-control"
                  placeholder="Type New Password"
                  name="newpwd"
                  onChange={this.handlePasswordChange}
                  value={this.state.newpwd}
                />
                {this.state.hiddenPassword2 ? (
                  <span
                    className="input-group-text eye"
                    onClick={this.hiddenPasswordHandler2}
                  >
                    <span
                      className="fa fa-eye"
                      aria-hidden
                      style={{ fontSize: "17px" }}
                    ></span>
                  </span>
                ) : (
                  <span
                    className="input-group-text eye"
                    onClick={this.hiddenPasswordHandler2}
                  >
                    <i
                      className="fa fa-eye-slash"
                      aria-hidden
                      style={{ fontSize: "17px" }}
                    ></i>
                  </span>
                )}
              </div>
              <p style={{ color: "red" }}>{this.state.newpwdError}</p>
            </div>
            <div className="mb-3">
              <label htmlFor="cnewpwd" className="cnewpwd">
                Confirm New Password:{" "}
              </label>
              <div className="input-group">
                <input
                  type={this.state.hiddenPassword3 ? "text" : "password"}
                  id="cnewpwd"
                  className="form-control"
                  placeholder="Confirm New Password"
                  name="cnewpwd"
                  onChange={this.handlePasswordChange}
                  value={this.state.cnewpwd}
                />
                {this.state.hiddenPassword3 ? (
                  <span
                    className="input-group-text eye"
                    onClick={this.hiddenPasswordHandler3}
                  >
                    <span
                      className="fa fa-eye"
                      aria-hidden
                      style={{ fontSize: "17px" }}
                    ></span>
                  </span>
                ) : (
                  <span
                    className="input-group-text eye"
                    onClick={this.hiddenPasswordHandler3}
                  >
                    <i
                      className="fa fa-eye-slash"
                      aria-hidden
                      style={{ fontSize: "17px" }}
                    ></i>
                  </span>
                )}
              </div>
              <p style={{ color: "red" }}>{this.state.cnewpwdError}</p>
            </div>
            <button
              style={{
                padding: "5px 25px 5px 25px",
                backgroundColor: "#ce3838",
                color: "white",
                borderRadius: "5px",
                border: "none",
                marginTop: "30px",
              }}
              type="submit"
            >
              Submit
            </button>
          </form>

          {passwordChangeRes ? (
            <p style={{ color: "#ce3838" }}>{passwordChangeRes}</p>
          ) : null}
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    usernameChangeRes: state.EditProfile.usernameChange,
    passwordChangeRes: state.EditProfile.passwordChange,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editUsername: (name) => dispatch(editUsername(name)),
    editPassword: (currentpwd, newpwd, confirmpwd) =>
      dispatch(editPassword(currentpwd, newpwd, confirmpwd)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
