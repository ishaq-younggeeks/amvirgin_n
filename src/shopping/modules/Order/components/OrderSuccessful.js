import React, { Component } from 'react'
import { connect } from 'react-redux'
import Header from '../../../../entertainment/modules/Header'

class OrderSuccessful extends Component {
    render() {
        const {placedMessage} = this.props;
        console.log("Order Successful :", placedMessage);
        return (
            <div>
                <Header />
                <h1>{}</h1>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        placedMessage: state.addressDetail.placedMessage
    }
}

export default connect(mapStateToProps, null)(OrderSuccessful);
