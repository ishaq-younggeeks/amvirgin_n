import React, { Component } from 'react' 
import { connect } from 'react-redux';

export default class PaymentFilter extends Component {
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

  paginationnum = (e) => {
    e.preventDefault();
    console.log("Filter Paginationnum Method calling.....")
    let perPage = parseInt(e.target.value);
          this.props.clearState("orders", []);

    this.setState({
      pagination: perPage,
      currentPage: 1,
    });
    this.props.myOrderList(1, perPage);
  }

  paginate = (e, direction, current) => {
    e.preventDefault();
    if (direction === "inc") {
     this.props.clearState("orders", []);
      this.props.myOrderList(current + 1, this.state.pagination);
      this.setState((prevState) => {
        return { currentPage: prevState.currentPage + 1 };
      });
    } else {
     this.props.clearState("orders", []);

      this.setState({ currentPage: this.state.currentPage - 1 });
      this.props.myOrderList(this.state.currentPage - 1, this.state.pagination);
    }
  };

  render() {
    const {metaData} = this.props
    console.log("MetaData: ", metaData);
    return (
      <>
       <div className="col-sm-1">
            <select
              id="attributename"
              name="attributename"
              ref="modifierName"
              style={{
                width: "100%",
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
      </>
    )
  }
}

