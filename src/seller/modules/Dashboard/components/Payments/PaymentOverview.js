// import React, { Component } from 'react'
// import {connect} from 'react-redux';
// import {getPaymentOverview} from './PaymentAction'

// class PaymentOverview extends Component {

//   componentDidMount () {
//     this.props.getPaymentOverview();
//   }
//   render() {
//     const {previewDetail} = this.props
//     return (
//       <React.Fragment>
//         <div className="overview-card next-payment">
//         {previewDetail.next?
//         <>
//         <div className="card-header">
//             <h4>Next Payment</h4>
//             <div className="desc-date-block">
//               <div className="desc-block">
//                 Estimated value of next payment. This may change due to returns
//                 that come in before the next payout. This might be inclusive of
//                 amount shown as Last Payment on a payout day. It could take up
//                 to 24 hrs to get updated.
//               </div>
//               <div className="date-block">{previewDetail.next.date}</div>
//             </div>
//           </div>
//           <div className="card-inner-block">
//             <div className="card-body">
//               <div className="inner-card-scroll">
//                 <div className="row">
//                   <div className="float-left">
//                     <span>Postpaid</span>
//                     <span className="label-info"></span>
//                   </div>
//                   <div className="overview-price">
//                     <div className="">
//                       <div>₹{previewDetail.next.postpaid}</div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="row">
//                   <div className="">
//                     <span>Prepaid </span>
//                     <span className="label-info"></span>
//                   </div>
//                   <div className="">
//                     <div className="overview-price">
//                       <div>₹{previewDetail.next.prepaid}</div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="card-footer">
//               <div className="row">
//                 <div className="footer-label">Total</div>
//         <div className="main-total">₹{previewDetail.next.total}</div>
//               </div>
//             </div>
//           </div>
//           </>:null}
//         </div>
//         <div className="overview-card next-payment">
//         {previewDetail.next?
//         <>
//           <div className="card-header">
//             <h4>Previous Payment</h4>
//             <div className="desc-date-block">
//               <div className="desc-block">
//                 Estimated value of next payment. This may change due to returns
//                 that come in before the next payout. This might be inclusive of
//                 amount shown as Last Payment on a payout day. It could take up
//                 to 24 hrs to get updated.
//               </div>
//               <div className="date-block">{previewDetail.previous.date}</div>
//             </div>
//           </div>
//           <div className="card-inner-block">
//             <div className="card-body">
//               <div className="inner-card-scroll">
//                 <div className="row">
//                   <div className="">
//                     <span>Postpaid</span>
//                     <span className="label-info"></span>
//                   </div>
//                   <div className="">
//                     <div className="overview-price">
//                       <div>₹{previewDetail.previous.postpaid}</div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="row">
//                   <div className="">
//                     <span>Prepaid </span>
//                     <span className="label-info"></span>
//                   </div>
//                   <div className="">
//                     <div className="overview-price">
//                       <div>₹{previewDetail.previous.prepaid}</div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="card-footer">
//               <div className="row">
//                 <div className="footer-label">Total</div>
//                 <div className="main-total">₹ {previewDetail.previous.total}</div>
//               </div>
//             </div>
//           </div>
//           </>:null}
//         </div>
//         <div className="overview-card next-payment">
//         {previewDetail.total?
//         <>
//           <div className="card-header">
//             <h4>Total Payment</h4>
//             <div className="desc-date-block">
//               <div className="desc-block">
//                 Estimated value of next payment. This may change due to returns
//                 that come in before the next payout. This might be inclusive of
//                 amount shown as Last Payment on a payout day. It could take up
//                 to 24 hrs to get updated.
//               </div>
              
//             </div>
//           </div>
//           <div className="card-inner-block">
//             <div className="card-body">
//               <div className="inner-card-scroll">
//                 <div className="row">
//                   <div className="">
//                     <span>Postpaid</span>
//                     <span className="label-info"></span>
//                   </div>
//                   <div className="">
//                     <div className="overview-price">
//                       <div>₹{previewDetail.total.postpaid}</div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="row">
//                   <div className="">
//                     <span>Prepaid </span>
//                     <span className="label-info"></span>
//                   </div>
//                   <div className="">
//                     <div className="overview-price">
//                       <div>₹{previewDetail.total.prepaid}</div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="card-footer">
//               <div className="row">
//                 <div className="footer-label">Total</div>
//                 <div className="main-total">₹ {previewDetail.total.total}</div>
//               </div>
//             </div>
//           </div>
//           </>:null}
//         </div>
//       </React.Fragment>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   console.log("payment overview ",state.sellerPayment.previewDetail)
//   return {
//     previewDetail:state.sellerPayment.previewDetail
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     getPaymentOverview : () => dispatch(getPaymentOverview())
//   }
// }

// export default connect(mapStateToProps,mapDispatchToProps)(PaymentOverview);
