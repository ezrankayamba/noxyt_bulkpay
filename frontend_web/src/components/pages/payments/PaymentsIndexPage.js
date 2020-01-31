import React, {Component} from 'react';
import BatchList from "./BatchList";

class PaymentsIndexPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <BatchList/>
        )
    }
}

export default PaymentsIndexPage;