import React, { Component, createRef } from "react";
import AdvtNavigation from "./AdvtNavigation";
import AdvList from "./AdvtList";
import {Link} from 'react-router-dom'
import CreateAdvt from  "./CreateAdvt"
import {CREATEADVT_STATUS} from './AdvConstant'
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';
export default class Advthome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      openModal:false
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("next props", nextProps);
    if (nextProps.savedStatus && nextProps.savedStatus.status === 200) {
      ToastsStore.success("created succesfully");
      nextProps.clearState('savedStatus',{});
      return {
        openModal: false,
        
      };
    } else return null;
  }

  classMethod = () => {
    console.log("calling")
    this.props.clearState('savedStatus',{});
  };

 

  closeModal = (e)=> {
    e.preventDefault();
    this.setState({openModal:false})
    this.classMethod()
  }
  activeModal = (e) => {
    e.preventDefault();
    this.setState({openModal:true},console.log("current state",this.state))
  }
  render() {
    return (
      <React.Fragment>
        <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT} />
      <div className="container-fliud" style={{ marginTop: "5%" }}>
        {/* <AdvtNavigation activeTab1="true"/> */}
        <div className="row">
        <h3 style={{marginLeft:"30px", marginTop:"20px"}}>Advertising</h3>        </div>
        <hr style={{margin:"0px 15px"}}/>
        <div>
         
          <div
            className="categorycontainer myprocontainer w-50 row"
            style={{ textAlign: "center", padding: "20px", marginLeft:"15px" }}
          >
            <div className="w-50">
              <p>Wanna go for advertisment?</p>
            </div>
           
            <div className="w-50 text-center">
              <div>
                <button
                  className="btn btn-primary"
                 onClick={this.activeModal}
                >
                  Create your advertisment
                </button>
              </div>
            </div>
          </div>
        </div>
        <AdvList {...this.props}/>
      </div>
      {this.state.openModal?<CreateAdvt openModal={this.state.openModal} closeModal={this.closeModal} creatAdvt={this.props.creatAdvt} {...this.props}/>:null}
      </React.Fragment>
    );
  }
}
