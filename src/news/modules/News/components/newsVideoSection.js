import React from "react";

class NewsVideoSection extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div class="specific mainvideopart">
        <div class="container-fluid newsvideo">
          <h3 class="videonews"> Videoes</h3>
          <hr/>
          <div class="flexpart">
            <div class="bigvideo playvideo">
              <a href="playvideo.html">
                <img class="videobanner" src="img/main5.jpg" />
                <img class="videoplaybtn" src="img/playred.png" />
              </a>
              <div class="videodetail">
                <a href="playvideo.html">
                  <h2>
                    Guess The Bollywood Movie By These Images
                  </h2> 
                </a>
                <h6>7 min 26sec</h6>
              </div>
            </div>
            <div class="fourvideo">
              <div class="flexvideo">
                <a href="playvideo.html" class="videolink">
                  <div class="containerimage">
                    <img src="img/news1.webp" class="bannermulti"/>
                    <img class="videoplaybtn" src="img/playred.png" />
                  </div>
                  <h4>A Day at the NRC and CAA Protests in Delhi</h4>
                  <h6> 04:35 min </h6>
                </a>
                <a href="playvideo.html" class="videolink">
                  <div class="containerimage">
                    <img src="img/news1.webp" class="bannermulti"/>
                    <img class="videoplaybtn" src="img/playred.png" />
                  </div>
                  <h4>A Day at the NRC and CAA Protests in Delhi</h4>
                  <h6> 04:35 min </h6>
                </a>
                <a href="playvideo.html" class="videolink">
                  <div class="containerimage">
                    <img src="img/news1.webp" class="bannermulti"/>
                    <img class="videoplaybtn" src="img/playred.png" />
                  </div>
                  <h4>A Day at the NRC and CAA Protests in Delhi</h4>
                  <h6> 04:35 min </h6>
                </a>
                <a href="playvideo.html" class="videolink">
                  <div class="containerimage">
                    <img src="img/news1.webp" class="bannermulti"/>
                    <img class="videoplaybtn" src="img/playred.png" />
                  </div>
                  <h4>A Day at the NRC and CAA Protests in Delhi</h4>
                  <h6> 04:35 min </h6>
                </a>
              </div>
            </div>
          </div>  
        </div>
      </div>
    )
  }
}
export default NewsVideoSection;