import React, { Component } from 'react'
import Header from '../../../entertainment/modules/Header'
import SubMenu from '../Home/components/SubMenu'

export default class ViewMyOrders extends Component {
    render() {
        return (
            <div>
             <Header />
             <SubMenu {...this.props} />
            </div>
        )
    }
}
