import React, { Profiler } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  getBuisnessDetails,
  saveBusinessDetails,
  getBankDetails,
  saveBankDetails,
  clearSavedStatus,
  
} from "./SettingAction";
import {
  countryList,
  stateList,
  cityList,
  clearState
} from "../MyProducts/sellerAddProductAction";
import "./setting.css";
import EditBuisnessDetail from "./EditBuisnessDetail";
import EditBankDetail from "./EditBankDetail";

class BusinessDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setOpenBdetail: false,
      setOpenBnkdetail: false,
      recievedProps: true,
    };
  }

  componentDidMount() {
    this.props.getBuisnessDetails();
    this.props.getBankDetails();
  }

  editbDetails = () => {
    this.setState({ setOpenBdetail: true });
  };

  editbnkDetails = () => {
    this.setState({ setOpenBnkdetail: true });
  };

  closeModal = () => {
    this.setState({ setOpenBdetail: false, setOpenBnkdetail: false });
    this.props.clearSavedStatus();
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("next props", nextProps);
    if (nextProps.savedStatus && nextProps.savedStatus.status === 200) {
      return {
        setOpenBdetail: false,
        setOpenBnkdetail: false,
        recievedProps: false,
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

  render() {
    const { buisnessDetails, bankDetails } = this.props;

    return (
      <React.Fragment>
        <div
          className="container-fliud emp-profile"
          style={{ marginTop: "6%" }}
        >
          <div>
                <button className="btn btn-outline-dark" onClick={this.props.history.goBack} style={{marginRight:"10px"}}><i className="fas fa-angle-double-left"/> Back</button>
          </div>
          <hr/>

          <div className="row">
            <div className="col-md-4 ">
              <div
                className="fixedheight"
                style={{ boxShadow: "0 0 10px #00000025", padding: "3%" }}
              >
                {buisnessDetails && Object.keys(buisnessDetails).length ? (
                  <div className="profile-tab" style={{ textAlign: "justify" }}>
                    <div className="row">
                      <div className="col-md-10">
                        <h3 >Business Details</h3>  
                      </div>
                      <div>
                        <Link onClick={this.editbDetails} style={{color:"dodgerblue",textDecoration:"underline"}}>Edit</Link>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <p className="headerlab">Business Name</p>
                      </div>
                      <div className="col-md-12">
                        <p>
                          <span>{buisnessDetails.name}</span>
                          {buisnessDetails.nameVerified ? (
                            <span
                              className="fas fa-check-double"
                              style={{ color: "rgb(21,241,21)" }}
                            ></span>
                          ) : null}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <p className="headerlab">
                          GST
                        </p>
                      </div>
                      <div className="col-md-12">
                        <p>
                          <span>{buisnessDetails.gstIN}</span>
                          {buisnessDetails.gstINVerified ? (
                            <span
                              className="fas fa-check-double"
                              style={{ color: "rgb(21,241,21)" }}
                            ></span>
                          ) : null}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <p className="headerlab">Registered Business Address</p>
                      </div>
                      <div className="col-md-12">
                        <p>
                          <span>{buisnessDetails.rbaFirstLine}, </span>
                          <span>{buisnessDetails.rbaSecondLine}</span>
                        </p>
                        <p>
                          <span>{buisnessDetails.rbaCity.name}, </span>
                          <span>{buisnessDetails.rbaState.name}</span>
                        </p>
                        <p>
                          <span>{buisnessDetails.rbaCountry.name}, </span>
                          <span>{buisnessDetails.rbaPinCode}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="col-md-4">
              <div
                className="fixedheight"
                style={{ boxShadow: "0 0 10px #00000025", padding: "3%" }}
              >
                {bankDetails && Object.keys(bankDetails).length ? (
                  <div
                    className=" profile-tab"
                    style={{ textAlign: "justify" }}
                  >
                    <div className="row">
                      <div className="col-md-10">
                        <h3> Bank Details</h3>
                      </div>
                      <div>
                        <Link onClick={this.editbnkDetails} style={{color:"dodgerblue",textDecoration:"underline"}}>Edit</Link>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <p className="headerlab">Account Holder Name</p>
                      </div>
                      <div className="col-md-12">
                        <p>{bankDetails.accountHolderName}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <p className="headerlab">Account Number</p>
                      </div>
                      <div className="col-md-12">
                        <p>{bankDetails.accountNumber}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <p className="headerlab">Bank Name</p>
                      </div>
                      <div className="col-md-12">
                        <p>{bankDetails.bankName}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <p className="headerlab">Branch Name</p>
                      </div>
                      <div className="col-md-12">
                        <p>{bankDetails.branch}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <p className="headerlab">IFSC</p>
                      </div>
                      <div className="col-md-12">
                        <p>{bankDetails.ifsc}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <p className="headerlab">City</p>
                      </div>
                      <div className="col-md-12">
                        <p>{bankDetails.city.name}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <p className="headerlab">State</p>
                      </div>
                      <div className="col-md-12">
                        <p>{bankDetails.state.name}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <p className="headerlab">Country</p>
                      </div>
                      <div className="col-md-12">
                        <p>{bankDetails.country.name}</p>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        {this.state.setOpenBdetail ? (
          <EditBuisnessDetail
            setOpenBdetail={this.state.setOpenBdetail}
            closeModal={this.closeModal}
            countryList={this.props.countryList}
            stateList={this.props.stateList}
            cityList={this.props.cityList}
            countries={this.props.countries}
            statelist={this.props.statelist}
            cities={this.props.cities}
            buisnessDetails={this.props.buisnessDetails}
            saveBusinessDetails={this.props.saveBusinessDetails}
            savedStatus={this.props.savedStatus}
            clearState={this.props.clearState}
          />
        ) : null}

        {this.state.setOpenBnkdetail ? (
          <EditBankDetail
            setOpenBnkdetail={this.state.setOpenBnkdetail}
            closeModal={this.closeModal}
            countryList={this.props.countryList}
            stateList={this.props.stateList}
            cityList={this.props.cityList}
            countries={this.props.countries}
            statelist={this.props.statelist}
            cities={this.props.cities}
            bankDetails={this.props.bankDetails}
            saveBankDetails={this.props.saveBankDetails}
            savedStatus={this.props.savedStatus}
            clearState={this.props.clearState}
          />
        ) : null}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("bank details", state.sellerSetting.savedStatus);
  return {
    buisnessDetails: state.sellerSetting.buisnessDetails,
    bankDetails: state.sellerSetting.bankDetails,
    countries: state.sellerAddProduct.countries,
    statelist: state.sellerAddProduct.statelist,
    cities: state.sellerAddProduct.cities,
    savedStatus: state.sellerSetting.savedStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBuisnessDetails: () => dispatch(getBuisnessDetails()),
    saveBusinessDetails: (data) => dispatch(saveBusinessDetails(data)),
    getBankDetails: () => dispatch(getBankDetails()),
    saveBankDetails: (data) => dispatch(saveBankDetails(data)),
    countryList: () => dispatch(countryList()),
    stateList: (countryId) => dispatch(stateList(countryId)),
    cityList: (stateId) => dispatch(cityList(stateId)),
    clearSavedStatus: () => dispatch(clearSavedStatus()),
    clearState:(state,type) => dispatch(clearState(state,type))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BusinessDetails);
