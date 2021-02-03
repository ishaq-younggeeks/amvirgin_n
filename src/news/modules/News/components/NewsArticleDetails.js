import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Header from "../../../../entertainment/modules/Header";
import { articleDetailsFnc } from "../NewsAction";
import ReactHtmlParser from 'react-html-parser';

class NewsArticleDetails extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount = () => {
    let id = localStorage.getItem("newsId");
    this.props.articleDetailsFnc(id);
};

  render() {
    const { detailsOfArticle } = this.props;
    console.log("Article Details :", detailsOfArticle);
    return (
      <div>
        <Header />
        <div className="container-fluid blogsection specific">
          <h3 className="stories" style={{ fontWeight: "bold" , marginTop:"5rem"}}>
            {" "}
            <Link to="/news" style={{color:"darkred"}}>News</Link><span style={{color:"black"}}>{">"}</span> 
            Details<span style={{color:"black"}}>{">"}</span> 
          </h3>
          <hr
            style={{
              color: "red",
              backgroundColor: "#ce3838",
              height: 3,
              borderColor: "#ce3838",
            }}
          />
          <div>
          {ReactHtmlParser(detailsOfArticle)}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    detailsOfArticle: state.News.detailsOfArticle,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    articleDetailsFnc: (newsId) => dispatch(articleDetailsFnc(newsId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsArticleDetails);
