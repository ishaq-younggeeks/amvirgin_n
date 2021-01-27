import React, { Component } from "react";
import Header from "../../../entertainment/modules/Header";
import SubMenu from "../Home/components/SubMenu";
import Footer from "../Home/components/FooterWhite";
import "./Profile.css";
import Modal from "react-modal";

export default class EditProfile extends Component {
  constructor() {
    super();
    this.state = {
      modalIsOpen1: false,
      modalIsOpen2: false,
      username: "",
      oldpwd: "",
      newpwd: "",
      cnewpwd: ""
    };
  }

  openModal1 = () => {
    this.setState({
      modalIsOpen1: true,
    });
  }

  openModal2 = () => {
    this.setState({
      modalIsOpen2: true,
    });
  }

  closeModal1 = () => {
    this.setState({
      modalIsOpen1: false,
    });
  }

  closeModal2 = () => {
    this.setState({
      modalIsOpen2: false,
    });
  }

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
      username:e.target.value
    })
  };

  handlePasswordChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleNewUsernameSubmit = (e) => {
    e.preventDefault();
    console.log("Hello")
  }

  handlePasswordChangeSubmit = (e) => {
    e.preventDefault();
    console.log("Hello");
  }

  render() {
    return (
      <div className="shopMain">
        <Header />
        <SubMenu {...this.props} />
        <div>
          <div style={{ margin: "20px 0 0 30px" }}>
            <h3>Account Details: </h3>
            <label htmlFor="" className="email">
              Email:{" "}
            </label>
            <p>jaskaran09.ja@gmail.com</p>
            <label htmlFor="" className="mobile">
              Mobile:{" "}
            </label>
            <p>8360573379</p>
            <label htmlFor="" className="username">
              Username:{" "}
            </label>
            <p>
              Jaskaran Singh{" "}
              <a
                href="#"
                style={{ marginLeft: "15px", color: "red" }}
                onClick={() => this.setState({ modalIsOpen1: true })}
              >
                Change Username?
              </a>
            </p>
            <label htmlFor="" className="password">
              Password:{" "}
            </label>
            <p>
              ***********{" "}
              <a
                href="#"
                style={{ marginLeft: "15px", color: "red" }}
                onClick={() => this.setState({ modalIsOpen2: true })}
              >
                Change Password?
              </a>
            </p>
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
          <form onSubmit={this.handleNewUsernameSubmit}>
            <lable htmlFor="username" className="username">New Username: </lable>
            <input
              type="text"
              id="username"
              placeholder="Username"
              autoFocus
              onChange={this.handleUsernameChange}
              value={this.state.username}
              required
            />
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
          {/* {wrongOTP ? <p style={{ color: "#ce3838" }}>{wrongOTP}</p> : null} */}
        </Modal>

        <Modal
          isOpen={this.state.modalIsOpen2}
          onRequestClose={this.closeModal2}
          style={this.customStyles}
          ariaHideApp={false}
        >
          <h4 style={{ color: "#ce3838" }}>
            Change Password :
          </h4>
          <hr style={{ color: "#ce3838", borderColor: "#ce3838" }} />
          <form onSubmit={this.handlePasswordChangeSubmit}>
          <div className="mb-3">
            <label htmlFor="oldpwd" className="oldpwd">Old Password: </label>
            <div className="input-group">
            <input
              type="password"
              id="oldpwd"
              placeholder="Old Password"
              autoFocus
              name="oldpwd"
              onChange={this.handlePasswordChange}
              value={this.state.oldpwd}
              required
            />
            {this.state.hiddenPassword ? (
                <span className="input-group-text eye" onClick={this.hiddenPasswordHandler}>
               <i className="fa fa-eye" aria-hidden style={{fontSize:"17px"}}></i>
                </span>
              ) : (
                <span className="input-group-text eye" onClick={this.hiddenPasswordHandler}>
                <i className="fa fa-eye" aria-hidden style={{fontSize:"17px"}}></i>
                </span>
            )}
            </div>
            </div>
            <label htmlFor="oldpwd" className="newpwd">New Password: </label>
            <input
              type="password"
              id="newpwd"
              placeholder="New Password"
              name="newpwd"
              onChange={this.handlePasswordChange}
              value={this.state.newpwd}
              required
            />
            <label htmlFor="cnewpwd" className="cnewpwd">Confirm New Password: </label>
            <input
              type="password"
              id="cnewpwd"
              placeholder="Confirm New Password"
              name="cnewpwd"
              onChange={this.handlePasswordChange}
              value={this.state.cnewpwd}
              required
            />
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
          {/* {notRegister ? (
            <p style={{ color: "#ce3838" }}>{notRegister}</p>
          ) : null}
          {forgotPwdRes ? (
            <p style={{ color: "#ce3838" }}>{forgotPwdRes}</p>
          ) : null} */}
        </Modal>
      </div>
    );
  }
}
