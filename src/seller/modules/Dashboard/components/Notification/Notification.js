import React from "react";
import { connect } from "react-redux";
import { fetchAnnouncement, markAnnouncementStatus } from "./AnnouncmentAction";
import Modal from "react-modal";
import "./../../Dashboard.css";
import Loader from "react-loader-spinner";

class Subscription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      displayData: "",
    };
  }
  componentDidMount() {
    this.props.fetchAnnouncement();
  }

  viewDetail = (e, key) => {
    this.props.markAnnouncementStatus(key);
    this.setState({ modalIsOpen: true, displayData: key });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  render() {
    const customStyles = {
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        width: "50vw",
        transform: "translate(-50%, -50%)",
      },
    };
    return (
      <div className="container-fliud" style={{ marginTop: "5%" }}>
        <div className="row notify">
          <div className="col-sm-12">
            <div
              className="innerbox"
              style={{ background: "#fff", marginTop: "10px" }}
            >
              <h3>Announcement</h3>
              <hr />
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th>Subject</th>
                    <th>Status</th>
                    <th>Sent On</th>
                    <th>Action</th>
                  </tr>
                </thead>
                {this.props.ancmntData ? (
                  <tbody>
                    {this.props.ancmntData
                      ? this.props.ancmntData.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{item.title}</td>
                              {item.extra.read == true ? (
                                <td style={{ color: "green" }}>checked</td>
                              ) : (
                                <td style={{ color: "#bf0000" }}>View</td>
                              )}
                              <td>12-10-2020</td>
                              <td>
                                <button
                                  className="btn btn-primary"
                                  onClick={(e) => this.viewDetail(e, item.key)}
                                >
                                  view
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      : null}
                  </tbody>
                ) : (
                  <div className="loaderClass">
                  <Loader
                    type="Puff"
                    color="#00BFFF"
                    height={100}
                    width={100}
                    timeout={3000} //3 secs
                  />
                  </div>
                )}
              </table>
            </div>
          </div>
        </div>
        {this.state.modalIsOpen ? (
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            ariaHideApp={false}
            style={customStyles}
          >
            <div
                          onClick={this.closeModal}
                          style={{right:"20px",position:"absolute",cursor:"pointer",fontSize:"24px"}}
                        >
                   <i className="fa fa-close"></i>
                        </div> 
            {this.props.ancmntData
              ? this.props.ancmntData
                  .filter(
                    (item) => item.key === parseInt(this.state.displayData)
                  )
                  .map((item, index) => {
                    return (
                      <div key={index}>
                        <h3>Subject: {item.title} </h3>
                        <p>{item.content}</p>
                        {item.banner ? (
                          <img src={item.banner} style={{ width: "650px" }} />
                        ) : null}

                        
                      </div>
                    );
                  })
              : null}
             
          </Modal>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("state are ", state.sellerAnnouncement.announcement);
  return {
    ancmntData: state.sellerAnnouncement.announcement,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAnnouncement: () => dispatch(fetchAnnouncement()),
    markAnnouncementStatus: (key) => dispatch(markAnnouncementStatus(key)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Subscription);
