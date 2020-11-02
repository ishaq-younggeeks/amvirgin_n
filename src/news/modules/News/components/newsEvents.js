import React from 'react';

import "../../../style.css"

class NewsEvents extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <nav class="secondnavnews navbar-expand-sm justify-content-center">
        <div class="navbar-collapse">
          <ul class="navbar-nav m-auto">
            <li class="nav-item active ">
              <a class="nav-link colororange" href="#" > Politics <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item ">
              <a class="nav-link coloryellow" href="#"> Sports</a>
            </li>
            <li class="nav-item ">
              <a class="nav-link colorred" href="#"> Entertainment </a>
            </li>
            <li class="nav-item ">
              <a class="nav-link coloryellow" href="#">Health</a>
            </li>
            <li class="nav-item ">
              <a class="nav-link colororange2" href="#">Education</a>
            </li>  
          </ul>
        </div>
      </nav>
    )
  }
}
export default NewsEvents;