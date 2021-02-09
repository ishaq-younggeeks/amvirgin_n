// import React from "react";
// import { connect } from "react-redux";
// import {newsListingFnc} from "../NewsAction";

// class MainNewsSection extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   componentDidMount = () => {
//     this.props.newsListingFnc("1", "1"); 
//   }

//   render() {
//     return (
//       <div class="container-fluid blogsection specific">
//         <h3 class="stories"> News</h3>
//         <hr class="redhr"/>
//         <div class="flexsection">

//           <div class="blogpart">
//             <a href="#">
//               <div class="imgsection">
//                 <img src="img/news1.webp" alt="news1" />
//               </div>
//               <div class="details">
//                 <h3><span>Health</span></h3>
//                 <p> Why Didn't I Dive: MS Dhoni Opens Up About The Run-Out In 2019 World Cup Semi-Final</p>
//                 <h5>Srishti Magan</h5>
//                 <h6>18 hours ago</h6>
//               </div>
//             </a>
//           </div>
       
//           <div class="blogpart">
//             <a href="#">
//               <div class="imgsection">
//                 <img src="img/news1.webp" alt="news1" />
//               </div>
//               <div class="details">
//                 <h3><span>Entertainment</span></h3>
//                 <p> This 17-Yr-Old Discovered A New Planet On His 3rd Day Of Internship At NASA. BRB, Getting Coffee</p>
//                 <h5>Srishti Magan</h5>
//                 <h6>18 hours ago</h6>
//               </div>
//             </a>
//           </div>
//           <div class="blogpart">
//             <a href="#">
//               <div class="imgsection">
//                 <img src="img/news1.webp" alt="news1" />
//               </div>
//               <div class="details">
//                 <h3><span>Politics</span></h3>
//                 <p> Twitterati's Impressed With Martin Sheen Reciting Tagore's Poem At A Climate Change Protest</p>
//                 <h5>Srishti Magan</h5>
//                 <h6>18 hours ago</h6>
//               </div>
//             </a>
//           </div>
//           <div class="blogpart">
//             <a href="#">
//               <div class="imgsection">
//                 <img src="img/news1.webp" alt="news1" />
//               </div>
//               <div class="details">
//                 <h3><span>Health</span></h3>
//                 <p> I Imagined How Conversations Between Indian News Anchors & God Would Play Out</p>
//                 <h5>Srishti Magan</h5>
//                 <h6>18 hours ago</h6>
//               </div>
//             </a>
//           </div>
//         </div>  
//       </div>
//     )
//   }
// }

// const mapStateToProps = (state) => {
//   return {}
// }
 
// const mapDispatchToProps = (dispatch) => {
//   return {
//     newsListingFnc: (category, page) => dispatch(newsListingFnc(category, page))
//   }
// }

// export default connect (mapStateToProps, mapDispatchToProps)(MainNewsSection);