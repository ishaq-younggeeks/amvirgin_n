import React, { Component, useContext } from "react";
import { Helmet } from "react-helmet";
import Header from "../Header";
import Footer from "../Footer";
import { collectionData, clearCollectionData } from "./CollectionAction";
import { videoData } from "../Show/components/ShowAction";
import { GetData } from "../../../db.js";
import $ from "jquery";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Collection extends Component {

  constructor(props){
    super(props);
this.state = {
  title:""
}
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.collectionData(this.props.location.sectionData);
    console.log("this.props",this.props.match.params.title)
    this.setState({title:this.props.match.params.title})
  }

  render() {

    const {title} = this.state
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Amvirgin | Collection</title>
        </Helmet>
        <Header />
        <div className="bodysection">
          <div className="videocollection container">
            <h6> {title} </h6>

            <div className="row">
              {this.props.collectionDetail.length &&
                this.props.collectionDetail.map((collection, index) => {
                  return (
                    <div className="col-md-2 videomob">
                      <Link
                        onClick={() =>
                          this.props.videoData(
                            collection.id,
                            this.props.history
                          )
                        }
                      >
                        <div className="collection container2">
                          <img className="image" src={collection.poster} />
                          <div className="middle">
                            <div className="imgslider">
                              <img src={process.env.PUBLIC_URL+`/img/play.png`} alt="play" />
                            </div>
                          </div>
                        </div>
                        <div className="infomovie">
                          <h3>{collection.title}</h3>
                          <h5>{collection.type}</h5>
                        </div>
                      </Link>
                    </div>
                  );
                })}
            </div>

            <hr className="videohr" />
          </div>
        </div>

        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("state collection data", state.ShowCollection.collectionData);
  return {
    collectionDetail: state.ShowCollection.collectionData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    // addtoCart:(id) => dispatch(addtoCart(id)),
    //  getproduct:(id,hist) => dispatch(productDetail(id,hist)),
    collectionData: (collectionId) => dispatch(collectionData(collectionId)),
    clearCollectionData: () => dispatch(clearCollectionData()),
    videoData: (videoId, history) => dispatch(videoData(videoId, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Collection);
