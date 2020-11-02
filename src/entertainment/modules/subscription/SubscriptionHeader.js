import React, { Component } from 'react'


const activeClass = ()  => {
  let cl = "btn btn-circle btn-primary"
  return cl;

}

const defaultClass = () => {
  let cl = "btn btn-circle btn-default"
  return cl;
}

class SubscriptionHeader extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <>
                <div className="stepwizard col-md-offset-3">
                    <div className="stepwizard-row setup-panel"></div>
                    {this.props.arr.map((item,index) => {
                        return (
                            <div className="stepwizard-step">
                                <button key={index}  type="button" onClick={(e) => this.props.clickMe(index)} className={item.isActive === true ? "btn btn-circle btn-default":"btn btn-circle btn-default btn-primary"}>{item.id}</button>
                                <p>{item.name}</p>
                            </div>

                        )
                    })}
                </div>
              {/* <div className="stepwizard col-md-offset-3">  
                    <div className="stepwizard-row setup-panel">
                        <div className="stepwizard-step">
                            <button  type="button" onClick={(e) => this.props.handleClick('Step1',e)} className={this.props.activeClass==='Step1'?activeClass():defaultClass()}>1</button>
                            <p>AmVirgin Subscription</p>
                        </div>
                        <div className="stepwizard-step">
                            <button onClick={(e) => this.props.handleClick('Step2',e)} type="button" className={this.props.activeClass==='Step2'?activeClass():defaultClass()}>2</button>
                            <p>Select Pack</p>
                        </div>
                        <div className="stepwizard-step">
                            <button type="button" onClick={(e) => this.props.handleClick('Step3',e)} className={this.props.activeClass==='Step3'?activeClass():defaultClass()}>3</button>
                            <p>Enter Details</p>
                        </div>
                        <div className="stepwizard-step">
                            <button type="button" onClick={(e) => this.props.handleClick('Step4',e)} className={this.props.activeClass==='Step4'?activeClass():defaultClass()}>4</button>
                            <p>Pay</p>
                        </div>
                    </div>
                </div>   */}
            </>
          )
    }

}

export default SubscriptionHeader;