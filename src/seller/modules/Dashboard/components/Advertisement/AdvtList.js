import React, { Component, useEffect } from "react";
import AdvtEdit from "./AdvtEdit";

export default class Advtlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      subject: "",
      message: "",
      banner: "",
      keyValue: ""
    };
  }

  componentDidMount() {
    this.props.fetchAdvt();
  }

  // componentDidUpdate() {
  //   this.props.fetchAdvt();
  // }

  openModal = () => {
    this.setState({
      isModalOpen: true
    })
  }

  closeModal = (e) => {
    this.setState({
      isModalOpen: false,
    })
  } 

  setValues = (subject, message, banner, keyValue) => {
    this.setState({
      subject,
      message,
      banner,
      keyValue
    })
  }

  render() {
    return (
      <>
        <div className="container-fliud" style={{ marginTop: "5%" }}>
          {/* <div className="datepicker row">
          <div className="date-head">
            <p>From:</p>
          </div>
          <div className="date-select">
            <input type="date" id="from" name="from" />
          </div>
          <div className="date-head">
            <p>To:</p>
          </div>
          <div className="date-select">
            <input type="date" id="to" name="to" />
          </div>
          <div className="search-submit">
            <i class="fas fa-search"></i>
          </div>
        </div> */}
          <table className="Paymenttable" style={{ width: "50%" }}>
            <thead>
              <tr>
                <th style={{ padding: "0px 60px" }}>SUBJECTS</th>
                <th style={{ padding: "0px 60px" }}>MESSAGE</th>
                <th style={{ padding: "0px 60px" }}>BANNER</th>
                <th style={{ padding: "0px 70px" }}>DATE</th>
                <th style={{ padding: "0px 60px" }}>STATUS</th>
                <th style={{ padding: "0px 60px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.props.advtlist.length
                ? this.props.advtlist.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item.subject}</td>
                        <td>{item.message}</td>
                        <td>
                          <img
                            id="bannerimg"
                            src={item.image ? item.image : "/images/altimg.png"}
                            style={{
                              width: "200px",
                              height: "100px",
                              display: "block!important",
                            }}
                            alt="banner"
                          />
                        </td>
                        <td>{item.created}</td>
                        <td>{item.status}</td>
                        {item.status === "pending" ? (
                          <td style={{ padding:"0px 40px"}}>
                            <button
                              className="fas fa-edit approve-btn"
                              style={{ backgroundColor: "white" }}
                              onClick={() => {
                                this.openModal()
                                this.setValues(item.subject, item.message, item.image, item.key)
                              }}
                            ></button>
                            <button
                              className="fa fa-close disApprove-btn"
                              style={{ backgroundColor: "white", marginLeft:"30px" }}
                              onClick={() => {
                                this.props.deleteAdvt(item.key);
                                this.props.fetchAdvt();      
                              }}
                            ></button>
                          </td>
                        ) : (
                          <td style={{ fontWeight: "bold" }}>N/A</td>
                        )}
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </table>
        </div>
        {this.state.isModalOpen ?
        <AdvtEdit 
        openModal={this.state.isModalOpen}
        closeModal={this.closeModal}
        subject={this.state.subject}
        message={this.state.message}
        banner={this.state.banner}
        keyValue={this.state.keyValue}
        /> : null
        }        
      </>
    );
  }
}
