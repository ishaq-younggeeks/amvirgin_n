import React from "react";
import "../../../style.css";
import { newsListingFnc } from "../NewsAction";
import { connect } from "react-redux";

class NewsEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category_id: 1,
    };
  }

  componentDidMount = () => {
    this.props.newsListingFnc(this.state.category_id, "1");
  };

  // componentDidUpdate = (prevState) => {
  //   if(prevState !== this.state.category_id){
  //     this.props.newsListingFnc(this.state.category_id, "1");
  //   }
  // }

  render() {
    console.log("Category :", this.props.category);
    console.log("Listing :", this.props.newsListing);
    return (
      <>
        <nav
          className="secondnavnews navbar-expand-sm justify-content-center"
          style={{ marginTop: "6rem" }}
        >
          <div className="navbar-collapse">
            <ul className="navbar-nav m-auto">
              {this.props.category && this.props.category.categories
                ? this.props.category.categories.map((item, i) => (
                    <li className="nav-item active ">
                      <a
                        className={
                          "nav-link " +
                          (i % 2 === 0 ? "colororange" : "coloryellow")
                        }
                        href="#"
                      >
                        {" "}
                        {item.name} <span className="sr-only">(current)</span>
                      </a>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </nav>
        <div className="container-fluid blogsection specific">
          <h3 className="stories" style={{ fontWeight: "bold" }}>
            {" "}
            News
          </h3>
          <hr className="redhr" />
          <div className="flexsection">
            {this.props.newsListing && this.props.newsListing.data
              ? this.props.newsListing.data.map((item) => {
                  if (item.type !== "video") {
                    return (
                      <div className="blogpart">
                        <a href="#">
                          <div className="imgsection">
                            <img src={item.thumbnail} alt="news1"/>
                          </div>
                          <div className="details">
                            <h3>
                              <span>{item.type}</span>
                            </h3>
                            <p>{item.title}</p>
                            <h5>{item.author ? item.author : "Admin"}</h5>
                            <h6>
                              {item.published} | {item.estimatedRead} Minutes |{" "}
                              {item.views} Views
                            </h6>
                          </div>
                        </a>
                      </div>
                    );
                  }
                  return (
                    <div className="blogpart">
                      <a href="#">
                        <div>
                          <video src={item.video} alt="news1" controls="controls" />
                        </div>
                        <div className="details">
                          <h3>
                            <span>{item.type}</span>
                          </h3>
                          <p>{item.title}</p>
                          <h5>{item.author ? item.author : "Admin"}</h5>
                          <h6>
                            {item.published} | {item.duration} Minutes |{" "}
                            {item.views} Views
                          </h6>
                        </div>
                      </a>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    newsListing: state.News.newsListing,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    newsListingFnc: (category, page) =>
      dispatch(newsListingFnc(category, page)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsEvents);
