import React, {Component} from 'react';
import BatchList from "./BatchList";
import BatchAddForm from "./BatchAddForm";
import PaymentView from "./PaymentView";
import Button from "@material-ui/core/Button";

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

    getView() {
        switch (this.state.view) {
            case "add":
                return <BatchAddForm switchView={this.switchView}/>
            case "view":
                return <PaymentView selectedId={this.state.selectedId} switchView={this.switchView}/>
            default:
                return <BatchList switchView={this.switchView}/>
        }
    }

    render() {
        return (
            <div>
                {this.getView()}
            </div>
        )

    }
}

export default PaymentsIndexPage;