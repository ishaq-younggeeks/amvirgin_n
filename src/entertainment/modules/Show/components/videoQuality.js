import PropTypes from 'prop-types';
import React, { Component } from 'react';

const propTypes = {
  player: PropTypes.object,
  className: PropTypes.string
};

export default class VideoQualityButton extends Component {
    constructor(props, context) {
      super(props, context);
      this.state = {}
    }
  
    handleChange = (event) => {
        this.props.onVideoFormat(event.target.value)
    }
  
    render() {
      const { videoFormat } = this.props;
  
      return (
          <select onChange={this.handleChange} className="qualityVideo">
              <option selected={videoFormat==='1080p'}
                value="1080p"
                tabIndex="3">
                1080p
              </option>
              <option selected={videoFormat==='720p'}
                value="720p"
                tabIndex="2">
                720p
              </option>
              <option selected={videoFormat==='480p'}
                value="480p"
                tabIndex="1">
                480p
              </option>
              <option selected={videoFormat==='360p'}
                value="360p"
                tabIndex="0">
                360p
              </option>
          </select>
          // <div id="menu">
          //   <ul>
          //     <li>1080p
          //       <ul>
          //         <li>720p</li>
          //         <li>480p</li>
          //         <li>360p</li>
          //         <li>240p</li>
          //       </ul>
          //     </li>
          //   </ul>
          //   </div>
      );
    }
  }
  
  VideoQualityButton.propTypes = propTypes;