import React, { Component } from 'react'
import PaymentNavigation from './PaymentNavigation';
import PaymentOverview from './PaymentOverview';
import PreviousPayment from './PreviousPayment';
import './Payment.css';
import {Link} from 'react-router-dom'
export default class PaymentHome extends Component {
    render() {
        console.log("home of payment");
        return (
            <div className="container-fliud" style={{ marginTop: '5%' }}>    
             {/* <PaymentNavigation activeTab1="true"/> */}
             {/* <PaymentOverview /> */}
             <PreviousPayment />
            </div>
        )
    }
}
