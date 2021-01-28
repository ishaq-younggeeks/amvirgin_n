import React, { Component } from "react";
import Timer from "react-compound-timer";
import { Link } from "react-router-dom";

class DealTimer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const Dealdata = this.props.Dealdata;
    return (
      <div>
        <div className="dealtimer row">
          {this.props.Dealdata ? (
            <>
              <div className="dealover">
                <h4 style={{ fontSize: "25px!important" }}>
                  {this.props.Dealdata.title}
                </h4>
              </div>
              <div className="dealover2" id="countdown">
                {this.props.Dealdata.countDown ||
                this.props.Dealdata.countDown === 0 ||
                this.props.Dealdata.countDown > 0 ? (
                  <React.Fragment>
                    <Timer
                      initialTime={this.props.Dealdata.countDown}
                      direction="backward"
                    >
                      {() => (
                        <React.Fragment>
                          <div id="tiles">
                            <span>
                              <Timer.Hours />
                            </span>
                            <span>
                              <Timer.Minutes />
                            </span>
                            <span>
                              <Timer.Seconds />
                            </span>
                          </div>
                          <div className="labels">
                            <li>Hours</li>
                            <li>Mins</li>
                            <li>Secs</li>
                          </div>
                        </React.Fragment>
                      )}
                    </Timer>
                  </React.Fragment>
                ) : (
                  <div className="dealover">
                    <h2>No Deals For Today</h2>
                  </div>
                )}
              </div>
              {/* <div>
                <button class="btn btn-primary">view all Deals</button>
              </div> */}
            </>
          ) : (
            <div className="dealover">
              <h2>No Deals For Today</h2>
            </div>
          )}
          {/* <div className="dealover3"><h4></h4></div> */}
        </div>

        {this.props.Dealdata.visible === true ? (
          <div className="movingstrip">
            <marquee direction="left">
              {this.props.Dealdata.statements
                ? this.props.Dealdata.statements.map((deals) => {
                    return <p>{deals}</p>;
                  })
                : null}
            </marquee>
          </div>
        ) : null}
      </div>
    );
  }
}

export default DealTimer;
