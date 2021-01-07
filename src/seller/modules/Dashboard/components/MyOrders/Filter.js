
import React, { Component } from 'react'
import qs from "query-string";
 

export default class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searching: "",
      items: [],
      search: false,
      pagination: 10,
      currentPage: 1,
      maxPage: 1,
    }
  }

  componentDidMount = () => {
  //   let query = qs.parse(this.props.location.search)
  //   console.log("parsed query",query);
  //   this.setState({activeState:query.activeState})
  //  this.props.myOrderList(query.activeState,1,10);
  };

  searchHere = (e) => {
    e.preventDefault();
    this.setState({searching:e.target.value})
  }

  submitSearch = (e) => {
    e.preventDefault();
    this.props.FilterBySearch(1,this.state.pagination,this.state.searching,this.props.activeState)
  }

  paginationnum = (e) => {
    e.preventDefault();
    let perPage = parseInt(e.target.value);
          this.props.clearState("orders", []);

    this.setState({
      pagination: perPage,
      currentPage: 1,
    });
    this.props.myOrderList(this.props.activeState,1, perPage);
  }

  paginate = (e, direction, current) => {
    e.preventDefault();
    if (direction === "inc") {
      console.log("active state in filter",this.props.activeState)
     this.props.clearState("orders", []);
      this.props.myOrderList(this.props.activeState,current + 1, this.state.pagination);
      this.setState((prevState) => {
        return { currentPage: prevState.currentPage + 1 };
      });
    } else {
     this.props.clearState("orders", []);

      this.setState({ currentPage: this.state.currentPage - 1 });
      this.props.myOrderList(this.props.activeState,
        this.state.currentPage - 1,
        this.state.pagination
      );
    }
  };

  render() {
    const {metaData} = this.props
    return (
      <>
       <div className="col-sm-2">
            <select
              id="attributename"
              name="attributename"
              ref="modifierName"
              style={{
                width: "70%",
                margin: "5px 0",
                padding: "5px",
                border: "1px solid lightgrey",
                borderRadius: "3px",
              }}
              onChange={this.paginationnum}
            >
              <option value="10">Show 10</option>
              <option value="25">Show 25</option>
              <option value="50">Show 50</option>
              <option value="100">Show 100</option>
            </select>
          </div>
          
          {metaData && metaData.total ? (
            
            <div style={{ padding: "5px" }}>
              <p>
                {metaData.from}-{metaData.to} of {metaData.total} items | {this.state.currentPage} of {metaData.last_page} pages
              </p>
            </div>
          ) : null}
          <div>
            <ul className="pagination">
              <li
                className={
                  this.state.currentPage == 1
                    ? "page-item disabled"
                    : "page-item"
                }
              >
                <div
                  className="page-link"
                  style={{ cursor: "pointer" }}
                  onClick={(e) => this.paginate(e, "dec")}
                  disabled={this.state.currentPage == 1}
                >
                  <i className="fa fa-angle-left" aria-hidden="true"></i>
                </div>
              </li>
              <li className="page-item ">
                <div className="page-link">{this.state.currentPage}</div>
              </li>
              <li
                className={
                  this.state.currentPage == this.props.maxPage
                    ? "page-item disabled"
                    : "page-item"
                }
              >
                <div
                  className="page-link"
                  style={{ cursor: "pointer" }}
                  onClick={(e) =>
                    this.paginate(e, "inc", this.state.currentPage)
                  }
                >
                  <i className="fa fa-angle-right" aria-hidden="true"></i>
                </div>
              </li>
            </ul>
          </div>

          <div className="col-auto colwidth25">
            <form onSubmit={this.onSubmit}>
              <input
                type="search"
                name="search"
                onChange={this.searchHere}
                placeholder="Search by Order ID"
                style={{
                  width: "80%",
                  borderRadius: "5px",
                  height: "37px",
                  background: "#efefef",
                  padding: "10px",
                  margin: "5px 0",
                  border: "none",
                }}
              />
              <button
                type="submit"
                style={{
                  width: "20%",
                  background: "#bf0000",
                  border: "none",
                  color: "#fff",
                  borderRadius: "0 5px 5px 0",
                  height: "37px",
                  position: "relative",
                  left: "-5px",
                }}
                onClick={this.submitSearch}
              >
                <i className="fa fa-search" />
              </button>
            </form>
          </div> 
      </>
    )
  }
}
