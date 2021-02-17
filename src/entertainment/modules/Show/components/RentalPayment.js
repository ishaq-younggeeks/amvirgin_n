import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import RentalCheckout from "./RentalCheckout";
import {rentCheckout} from "./ShowAction";

const RentalPayment = (props) => {
  const [render, setRender] = useState("Card");

  const paymentTypeList = {
    Card: "CREDIT / DEBIT CARD",
    NetBank: "NET BANKING",
    BhimUpi: "PHONEPE / GOOGLE PAY / BHIM UPI",
    Wallet: "Select Wallet to pay",
  };

  useEffect(() => {
    let videoKey = localStorage.getItem("videoId");
    props.rentCheckout(videoKey)
  }, [])

  const selectPayment = (compName, e) => {
    e.preventDefault();
    setRender(compName);
  };

  return (
    <>
      <div className="row setup-content" id="step-4">
        <div className="stepsection">
          <div className="">
            <div className="container">
              <div className="addresspart">
                <div className="leftsection">
                  <div className="body-style paymentsection">
                    <div className="tab">
                      <button
                        className="tablinks tab-one"
                        onClick={(e) => selectPayment("Card", e)}
                        id="defaultOpen"
                      >
                        CREDIT / DEBIT CARD{" "}
                      </button>
                      <button
                        className="tablinks"
                        onClick={(e) => selectPayment("NetBank", e)}
                      >
                        {" "}
                        NET BANKING{" "}
                      </button>
                      <button
                        className="tablinks"
                        onClick={(e) => selectPayment("BhimUpi", e)}
                      >
                        {" "}
                        PHONE PE / GOOGLE PAY / BHIM UPI{" "}
                      </button>
                      <button
                        className="tablinks"
                        onClick={(e) => selectPayment("Wallet", e)}
                      >
                        {" "}
                        WALLETS{" "}
                      </button>
                    </div>
                    <div id="Card" className="tabcontent">
                      <h3 className="credit-card">{paymentTypeList[render]}</h3>
                      <RentalCheckout razorPay={props.razorPay} {...props}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h3 className="text-success">{props.rentSuccess ? props.rentSuccess : null}</h3>
      <h3 className="text-danger">{props.rentFailure ? props.rentFailure : null}</h3>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    razorOrderId: state.ShowVideos.razorPay,
    rentSuccess: state.ShowVideos.rentVideo,
    rentFailure: state.ShowVideos.videoRentedAlready
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    rentCheckout: (videoKey) => dispatch(rentCheckout(videoKey))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RentalPayment);
