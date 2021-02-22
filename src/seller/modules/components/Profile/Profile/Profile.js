import React, { Profiler, createRef } from "react";
import "./Profile.css";
import axios from "axios";
import { baseURL } from "../../../../../credential.json";
import EditProfile from "./EditProfile";
import Modal from "react-modal";
import { Link } from "react-router-dom";

class Profile extends React.Component {
  profile_image = createRef();
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      setIsOpen: false,
      setIsOpenEmail: false,
      setIsOpenpassword: false,
      OldPassword: "",
      NewPassword: "",
      MatchNewPassword: "",
      OldEmail: "",
      NewEmail: "",
      avatar: "",
      name: "",
      businessName: "",
      pinCode: "",
      address: "",
      state: "",
      country: "",
      city: "",
      description: "",
      statelist: {
        load: false,
        state: [],
      },
      citylist: {
        load: true,
        city: [],
      },
      progress: "none",
      update: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openmodal = this.openmodal.bind(this);
    this.OpenModalEmail = this.OpenModalEmail.bind(this);
    this.OpenModalpassword = this.OpenModalpassword.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.emailUpdate = this.emailUpdate.bind(this);
  }

  componentDidMount() {
    this.props.Fetchdata();
    this.props.countryList();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("next props", nextProps);
    if (nextProps.savedStatus && nextProps.savedStatus.status === 200) {
      return {
        setIsOpen: false,
        setIsOpenEmail: false,
        setIsOpenpassword: false,
      };
    } else return null;
  }

  classMethod = () => {
    this.props.clearSavedStatus();
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.savedStatus && this.props.savedStatus.status === 200) {
      //Perform some operation here
      this.classMethod();
    }
  }

  imgUpload = () => {
    this.profile_image.current.click();
  };

  handleImageChange = (e) => {
    e.preventDefault();
    console.log("name", e.target.files[0]);
    // let reader = new FileReader();
    // reader.onloadend = () => {
    //     this.setState({
    //         previewSignature:reader.result
    //     });
    //   };
    //   reader.readAsDataURL(e.target.files[0]);
    this.setState(
      {
        [e.target.name]: e.target.files[0],
      },
      console.log("this.state", this.state)
    );
  };

  updateAvtar = (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("avatar", this.state.avatar);
    this.props.uploadDisplay(fd);
  };

  onSubmit(e) {
    e.preventDefault();

    console.log(e.target);
    this.props.uploadDisplay(e.target);
    this.setState({ progress: "block" });
    this.setState({ update: true });
  }

  openmodal() {
    this.setState({ setIsOpen: true });
  }

  OpenModalpassword() {
    this.setState({ setIsOpenpassword: true });
  }

  OpenModalEmail() {
    this.setState({ setIsOpenEmail: true });
  }

  closeModal() {
    this.setState({ setIsOpen: false,setIsOpenpassword:false });
  }

  changePassword(e) {
    e.preventDefault();
    let data = {
      current: this.state.current,
      new: this.state.new,
      confirm: this.state.confirm,
    };
    console.log(data);
    let token = localStorage.getItem("token");
    axios
      .put(`${baseURL}/seller/profile/password`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        let data = res.data.data;
        console.log("password changed succesfully",res);
      })
      .catch((error) => {
        console.log("Error in deleting Wishlist", error);
      });
  }

  emailUpdate(e) {
    e.preventDefault();
    let data = {
      email: this.state.NewEmail,
    };
    let token = localStorage.getItem("token");
    console.log("myaddd", data);
    axios
      .get(`${baseURL}/seller/change-email-token`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        let data = res.data.data;
        console.log(res);
      })
      .catch((error) => {
        console.log("Error in deleting Wishlist", error);
      });
  }

  updateProfile(e) {
    e.preventDefault();
    let data = {
      name: this.state.name,
      businessName: this.state.businessName,
      description: this.state.description,
      countryId: this.state.country,
      stateId: this.state.state,
      cityId: this.state.city,
      pinCode: this.state.pinCode,
      address: this.state.address,
    };
    console.log(data);
    this.props.updateProfile(data);
  }

  onChangeList = async (e) => {
    this.setState({ update: false });
    this.setState({
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "country") {
      let countryId = parseInt(e.target.value);
      let res = await axios.get(
        `${baseURL}/seller/countries/${countryId}/states`
      );
      this.setState({ statelist: { load: true, state: res.data.data } });
    } else if (e.target.name === "state") {
      let stateId = parseInt(e.target.value);
      let res = await axios.get(
        `${baseURL}/seller/countries/states/${stateId}/cities`
      );
      this.setState({ citylist: { load: true, city: res.data.data } });
    }
  };

  render() {
    const customStyles = {
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
      },
    };
    return (
      <div
        className="container-fliud emp-profile up6per"
        style={{ marginTop: "6%" }}
      >
        <div>
                <button className="btn btn-outline-dark" onClick={this.props.history.goBack} style={{marginRight:"10px"}}><i className="fas fa-angle-double-left"/> Back</button>
          </div>
          <hr/>
      
        <div className="row">
          <div className="col-md-4 fixedheight">
            <div className="fixedheight boxdes">
              <form onSubmit={this.updateAvtar} encType="multipart/form-data">
                <div className="profile-img" style={{ width: "100%" }}>
                  {this.props.profileData.avatar ? (
                    <img
                      src={this.props.profileData.avatar}
                      style={{
                        height: "37vh",
                        width: "100%",
                        objectFit: "cover",
                        objectPosition: "top",
                      }}
                    />
                  ) : (
                    <img
                      src="https://miro.medium.com/max/480/0*WK_vAxJo4O7Kdq3j.png"
                      alt=""
                      style={{
                        height: "37vh",
                        width: "100%",
                        objectFit: "cover",
                        objectPosition: "top",
                      }}
                    />
                  )}
                  <div
                    className="file btn btn-lg btn-primary"
                    style={{ width: "100%" }}
                    onClick={this.imgUpload}
                  >
                    Change Photo
                    <input
                      type="file"
                      accept="image/*"
                      name="avatar"
                      onChange={this.handleImageChange}
                      ref={this.profile_image}
                      style={{ display: "none" }}
                      required
                    />
                    {/* <div
                      id="upload"
                      style={{
                        height: "3px",
                        width: "1%",
                        background: "#bf0000",
                        display: this.state.progress,
                      }}
                    /> */}
                  
                  
</div><div className="progress" id="progress_block" style={{display:'none'}}>
  <div className="progress-bar" id ="upload" ></div>
</div>
                  <center>
                    <input
                      type="submit"
                      style={{
                        width: "100%",
                        background: "#bf0000",
                        color: "#fff",
                        borderRadius: "4px",
                      }}
                    ></input>
                  </center>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-4 ">
            <div className="fixedheight boxdes">
              <div className=" profile-tab" style={{ textAlign: "justify" }}>
                <h3>Contact Details</h3>
                <div className="row">
                  <div className="col-md-12">
                    <p className="headerlab">Mobile</p>
                  </div>
                  <div className="col-md-12">
                    <p>{this.props.profileData.mobile}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <p className="headerlab">Email</p>
                  </div>
                  <div className="col-md-12">
                    <p>{this.props.profileData.email}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <p className="headerlab">Address</p>
                  </div>
                  {this.props.profileData.address &&
                  <>
                  <div className="col-md-12">
                    <p>{this.props.profileData.address.firstLine}</p>
                  </div>
                  <div className="col-md-12">
                    <p>{this.props.profileData.address.secondLine}</p>
                  </div>
                  <div className="col-md-12">
                    <p>{this.props.profileData.city.name},
                     {this.props.profileData.state.name},
                     {this.props.profileData.country.name}
                     </p>                    
                  </div>
                  </>
                  }
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <p className="headerlab">Pin Code</p>
                  </div>
                  <div className="col-md-12">
                    <p>{this.props.profileData.pinCode}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="fixedheight boxdes">
              <div className=" profile-tab" style={{ textAlign: "justify" }}>
                <h3>Display Information</h3>
                <div className="row">
                  <div className="col-md-12">
                    <p className="headerlab">Display Name</p>
                  </div>
                  <div className="col-md-12">
                    <p>{this.props.profileData.name}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <p className="headerlab">Business Name</p>
                  </div>
                  <div className="col-md-12">
                    <p>{this.props.profileData.businessName}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <p className="headerlab">Business Description</p>
                  </div>
                  <div className="col-md-12">
                    <p>{this.props.profileData.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="boxdes upspace10">
              <div className=" profile-tab" style={{ textAlign: "justify",margin:"10px" }}>
                <div className="row">
                  <div className="w-50" style={{width:"58%",paddingLeft:"10px"}}>
                  <h4>Login Details</h4>
                  </div>
                  <div style={{marginLeft:"10px"}}>
                  <button className="btn btn-primary" onClick={this.OpenModalpassword}>change password</button>
                  </div>
                </div> 
                <div className="row">
                  <div className="col-md-12">
                    <p className="headerlab">Email</p>
                  </div>
                  <div className="col-md-12">
                    <p>{this.props.profileData.email}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <p className="headerlab">Password</p>
                  </div>
                  <div className="col-md-12">
                    <p>******</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="boxdes upspace10">
              <p>
                <b>Edit Profile</b>
              </p>
              <button className="subbtnd1" onClick={this.openmodal}>
                Edit
              </button>
              {this.state.setIsOpen ? (
                <EditProfile
                  setIsOpen={this.state.setIsOpen}
                  closeModal={this.closeModal}
                  countryList={this.props.countryList}
                  stateList={this.props.stateList}
                  cityList={this.props.cityList}
                  countries={this.props.countries}
                  statelist={this.props.statelist}
                  cities={this.props.cities}
                  bankDetails={this.props.bankDetails}
                  updateProfile={this.props.updateProfile}
                  savedStatus={this.props.savedStatus}
                  profileData={this.props.profileData}
                />
              ) : null}

              <Modal
                isOpen={this.state.setIsOpenEmail}
                onRequestClose={this.closeModal}
                style={customStyles}
              >
                <form onSubmit={this.emailUpdate}>
                  <div className="form-group">
                    <input
                      type="Email"
                      name="NewEmail"
                      className="form-control"
                      placeholder="Enter Your Email"
                      onChange={this.onChangeList}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="submit"
                      name="btnSubmit"
                      className="btnContact"
                      value="Edit"
                    />
                  </div>
                </form>
              </Modal>
              <Modal
                isOpen={this.state.setIsOpenpassword}
                onRequestClose={this.closeModal}
                style={customStyles}
              >
                <div
                          onClick={this.closeModal}
                          style={{right:"20px",position:"absolute",cursor:"pointer",fontSize:"24px"}}
                        >
                   <i className="fa fa-close"></i>
                        </div> 
                <form onSubmit={this.changePassword} style={{marginTop:"30px"}}>
                  <div className="form-group">
                    <input
                      type="Password"
                      name="current"
                      class="form-control"
                      placeholder="Old Password"
                      onChange={this.onChangeList}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="Password"
                      name="new"
                      className="form-control"
                      placeholder="New Password "
                      onChange={this.onChangeList}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="Password"
                      name="confirm"
                      className="form-control"
                      placeholder="Confirm Password"
                      onChange={this.onChangeList}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="submit"
                      name="btnSubmit"
                      className="btn btn-primary btnContact"
                      value="Update password"
                    />
                  </div>
                </form>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
