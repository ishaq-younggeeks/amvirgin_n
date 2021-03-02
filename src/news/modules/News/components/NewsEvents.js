import React from "react";
import "../../../style.css";
import { newsListingFnc, articleDetailsFnc } from "../NewsAction";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class NewsEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category_id: 1,
      active_class: 0
    };
  }

  componentDidMount = () => {
    this.props.newsListingFnc(this.state.category_id, "1");
  };

  render() {
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
                    <li className={`nav-item + ${i === this.state.active_class ? "active-news" : ""}`}>
                      <a
                        className={
                          "nav-link " +
                          (i % 2 === 0 ? "colororange" : "coloryellow")
                        }
                        href="#" onClick={() => (this.props.newsListingFnc(item.key, "1"), this.setState({active_class: i}))}
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
          <hr style={{
              color: "red",
              backgroundColor: "#ce3838",
              height: 3,
              borderColor: "#ce3838",
            }}/>
          <div className="flexsection">
            {this.props.newsListing && this.props.newsListing.data
              ? this.props.newsListing.data.map((item) => {
                  if (item.type !== "video") {
                    return (
                      <div className="blogpart" style={{width:"76.3%"}}>
                        <Link to="/news/details">
                        <a href="#" onClick={() => localStorage.setItem("newsId", item.key)}>
                          <div>
                            <img src={item.thumbnail} alt="news1" style={{width:"100%"}}/>
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
                        </Link>
                      </div>
                    );
                  }
                  return (
                    <div className="blogpart" style={{width:"76.3%"}}>
                      <a href="#">
                        <div>
                          <video src={item.video} alt="news1" controls="controls" onContextMenu={(e)=>  {e.preventDefault(); return false;}} onClick={() => this.props.articleDetailsFnc(item.key)}/>
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
      articleDetailsFnc: (id) => dispatch(articleDetailsFnc(id))  
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsEvents);
