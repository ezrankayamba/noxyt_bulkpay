import React, {Component} from 'react';
import PaymentList from "./PaymentList";
import PaymentAddForm from "./PaymentAddForm";
import PaymentView from "./PaymentView";

class PaymentsIndexPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view: 'list',
            selectedId: -1
        }
        this.switchView = this.switchView.bind(this)
    }

    switchView(name, id = -1) {
        this.setState({view: name, selectedId: id})
    }

    render() {
        switch (this.state.view) {
            case "add":
                return <PaymentAddForm switchView={this.switchView}/>
            case "view":
                return <PaymentView switchView={this.switchView}/>
            default:
                return <PaymentList switchView={this.switchView}/>
        }
    }
}

export default PaymentsIndexPage;