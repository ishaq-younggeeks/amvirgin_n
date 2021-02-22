import React, { Component,createRef } from 'react'
import Modal from 'react-modal';

export default class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      businessName: "",
      description: "",
      pinCode: "",
      firstLine: "",
      secondLine: "",
      city: "",
      state: "",
      country: "",
    };
  }

  componentDidMount() {
    const { profileData } = this.props;
    this.props.countryList();
			this.props.stateList(profileData.country.key);
      this.props.cityList(profileData.state.key);
      if(profileData)
      {
    this.setState({
    	name:profileData.name,
    	businessName:profileData.businessName,
    	description:profileData.description,
      pinCode:profileData.pinCode,
      firstLine:profileData.address.firstLine,
      secondLine:profileData.address.secondLine,
      city:profileData.city.key,
      state:profileData.state.key,
      country:profileData.country.key
    })
  }
  }

  closeModal = () => {
    this.props.closeModal();
  };

  onChangeHandler = (e) => {
    this.setState(
      { [e.target.name]: e.target.value },
      console.log("current state", this.state)
    );
  };

  onChangeList = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });

    if (e.target.name === "country" && e.target.value !== this.state.country) {
      let countryId = parseInt(e.target.value);
      this.setState({ city: "", state: "" });
      this.props.stateList(countryId);
    }

    if (e.target.name === "state" && e.target.value !== this.state.state) {
      let stateId = parseInt(e.target.value);
      this.setState({ city: "" });

      this.props.cityList(stateId);
    }

    //   let res = await  axios.get(`${baseURL}/seller/countries/states/${stateId}/cities`)
    //   this.setState({citylist: {load: true,city:res.data.data}})
  };

  onSubmitHandler = (e) => {
    e.preventDefault();

    let data = {
      name:this.state.name,
      businessName: this.state.businessName,
      description: this.state.description,
      pinCode: this.state.pinCode,
      addressFirstLine:this.state.firstLine,
      addressSecondLine: this.state.secondLine,
      cityId: parseInt(this.state.city),
      stateId: parseInt(this.state.state),
      countryId: parseInt(this.state.country),
    };

    const fd = new FormData();

    let objectToFormData = function (obj, form, namespace) {
      let formKey;

      for (var property in obj) {
        if (obj.hasOwnProperty(property)) {
          if (namespace) {
            formKey = namespace + "[" + property + "]";
          } else {
            formKey = property;
          }

          // if the property is an object, but not a File,
          // use recursivity.
          if (
            typeof obj[property] === "object" &&
            !(obj[property] instanceof File)
          ) {
            objectToFormData(obj[property], fd, formKey);
          } else {
            // if it's a string or a File object
            fd.append(formKey, obj[property]);
          }
        }
      }
    };

    objectToFormData(data);
    this.props.updateProfile(data);
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
      <React.Fragment>
        <Modal
          isOpen={this.props.setIsOpen}
          onRequestClose={this.closeModal}
          ariaHideApp={false}
          style={customStyles}
        >
          <div>
            <h3>Edit Profile</h3>
          </div>
          <hr />
          <form onSubmit={this.onSubmitHandler} autoComplete="off">
            <div className="form-group row">
              <div className="col-sm-4 text-left">
                <label className="" htmlFor="name">
                  Name
                </label>
              </div>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChangeHandler}
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-4 text-left">
                <label className="" htmlFor="businessName">
                  Buisness Name
                </label>
              </div>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  name="businessName"
                  value={this.state.businessName}
                  onChange={this.onChangeHandler}
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-4 text-left">
                <label className="" htmlFor="description">
                  Description
                </label>
              </div>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChangeHandler}
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-4 text-left">
                <label className="" htmlFor="country">
                  Country
                </label>
              </div>
              <div className="col-sm-8">
                <select
                  className=""
                  id="country"
                  name="country"
                  value={this.state.country}
                  onChange={this.onChangeList}
                >
                  <option value="select">Select Country</option>
                  {this.props.countries &&
                    this.props.countries.length &&
                    this.props.countries.map((country) => {
                      return (
                        <option key={country.id} value={country.id}>
                          {country.name}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-4 text-left">
                <label className="" htmlFor="state">
                  State
                </label>
              </div>
              <div className="col-sm-8">
                <select
                  className=""
                  id="state"
                  name="state"
                  value={this.state.state}
                  onChange={this.onChangeList}
                >
                  <option value="select">Select state</option>
                  {this.props.statelist &&
                    this.props.statelist.length &&
                    this.props.statelist.map((state) => {
                      return (
                        <option key={state.id} value={state.id}>
                          {state.name}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-4 text-left">
                <label className="" htmlFor="city">
                  City
                </label>
              </div>
              <div className="col-sm-8">
                <select
                  className=""
                  id="city"
                  name="city"
                  value={this.state.city}
                  onChange={this.onChangeList}
                >
                  <option value="select">Select City</option>
                  {this.props.cities &&
                    this.props.cities.length &&
                    this.props.cities.map((country) => {
                      return (
                        <option key={country.id} value={country.id}>
                          {country.name}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-4 text-left">
                <label className="" htmlFor="pinCode">
                  Pin Code
                </label>
              </div>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  name="pinCode"
                  value={this.state.pinCode}
                  onChange={this.onChangeHandler}
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-4 text-left">
                <label className="" htmlFor="firstLine">
                  Address 1
                </label>
              </div>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  name="firstLine"
                  value={this.state.firstLine}
                  onChange={this.onChangeHandler}
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-4 text-left">
                <label className="" htmlFor="secondLine">
                  Address 2
                </label>
              </div>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  name="secondLine"
                  value={this.state.secondLine}
                  onChange={this.onChangeHandler}
                />
              </div>
            </div>
            <div className="row d-flex justify-content-end">
              <div className="col-sm-4">
                <input
                  type="button"
                  className="btn btn-outline-dark"
                  value="cancel"
                  onClick={this.closeModal}
                />
              </div>
              <div className="col-sm-4">
                <input type="submit" className="btn btn-primary w-100" value="Save" />
              </div>
              <div
                style={{ background: "rgba(0, 0, 0, 0.9)", marginLeft: "10px" }}
              >
                {this.props.savedStatus && this.props.savedStatus.message && (
                  <center>
                    <p style={{ color: "red", padding: "10px" }}>
                      {this.props.savedStatus.message}{" "}
                    </p>
                  </center>
                )}
              </div>
            </div>
          </form>
        </Modal>
      </React.Fragment>
    );
  }
}
