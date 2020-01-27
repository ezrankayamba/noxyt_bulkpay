import React, {Component} from 'react';
import {connect} from "react-redux";
import {getClient} from "../../../_services/ClientsService";
import {getBatch} from "../../../_services/PaymentsService";

@connect((state) => {
    return {user: state.auth.user}
})
class PaymentView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            batch: null,
            records: []
        }
    }

    componentDidMount() {
        getBatch(this.props.user.token, this.props.selectedId, (res) => {
            if (res) {
                this.setState({batch: res, records: res.records})
            }
        })
    }

    render() {
        return (
            <div className="row">
                <div className="col">
                    <div className="d-flex align-items-center pb-2 pt-2">
                        <h3 className="flex-grow-1">Payment Records</h3>
                    </div>
                    <table className="table table-sm table-stripped table-hover">
                        <thead className="bg-light">
                        <tr>
                            <th>#</th>
                            <th>Account</th>
                            <th>Amount</th>
                            <th>Reason</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.records.map(item => {
                            return <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.account}</td>
                                <td>{item.amount}</td>
                                <td>{item.reason}</td>
                                <td>
                                    <div className="d-flex justify-content-end">

                                    </div>
                                </td>
                            </tr>
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default PaymentView;