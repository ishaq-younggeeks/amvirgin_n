import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getMouAgreement,getMouAgreementSatus,updateMouAgreementStatus} from './SettingAction'
import jsPDF from 'jspdf';

class Mou extends Component {
  constructor(props){
    super(props);
    this.state = {
      displayTC:true
    }
  }

  componentDidMount() {
    this.props.getMouAgreement();
    this.props.getMouAgreementSatus();
  }

  acceptAgreement = () => {
    this.props.updateMouAgreementStatus()
  }

  showTC = () => {
    this.setState({displayTC:true})
  }

  genratePdf = (e) => {
    e.preventDefault()
    var doc = new jsPDF()
    doc.setTextColor(100,0,0);
    doc.text(this.props.agreement, 40, 10)
    doc.save('agreement_license.pdf')

  }

  render() {
    return (
      <div
          className="container-fliud"
          style={{ marginTop: "6%" }}
        >
      <div className="row">
      <button className="btn btn-outline-dark" onClick={this.props.history.goBack} style={{marginRight:"10px"}}><i className="fas fa-angle-double-left"/> Back</button>
        <h3>MOU:The Memorandom of Understanding</h3>
        </div>
        <hr/>
        <div className="row">
        {this.props.agreementStatus?<div>
        <p style={{color:"dodgerblue"}}>Read T&c accepted while Signup</p>
        
        </div>:<div>
        <p style={{color:"dodgerblue"}}>Accept updated T&c </p>
        </div>}
        <button className="btn btn-outline-primary" onClick={this.genratePdf} style={{marginLeft:"10px"}}> Download <i className="fas fa-download"/></button>
        </div>
        {this.state.displayTC &&<div style={{padding:"10px"}}>
          <pre  className="tccontainer">
              {`${this.props.agreement}
`}
</pre>
        </div>}

      {this.props.agreementStatus?null:(<div>
        <button className="btn btn-primary" onClick={this.acceptAgreement}>I agree</button>
      </div>)}
        
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log("agreement status",state.sellerSetting.agreementStatus)
  return {
    agreement:state.sellerSetting.agreement,
    agreementStatus:state.sellerSetting.agreementStatus
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getMouAgreement: () => dispatch(getMouAgreement()),
    getMouAgreementSatus: () => dispatch(getMouAgreementSatus()),
    updateMouAgreementStatus:() => dispatch(updateMouAgreementStatus())

  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Mou);
