import React, {Component} from 'react';
import {connect} from "react-redux";
import {deleteBatch, fetchBatches} from "../../../_services/PaymentsService";

@connect((state) => {
    return {
        user: state.auth.user
    }
})
class BatchList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            payments: []
        }
    }
    refresh(){
        fetchBatches(this.props.user.token, (res) => {
            if (res) {
                this.setState({payments: res})
            }
        })
    }
    componentDidMount() {
        this.refresh()
    }

    delete(id) {
        deleteBatch(this.props.user.token, id, (res) => {
            if (res) {
                this.refresh()
            }
        })
    }

    render() {
        return (
            <div className="row">
                <div className="col">
                    <div className="d-flex align-items-center pb-2 pt-2">
                        <h3 className="flex-grow-1">List of payment batches</h3>
                        <div>
                            <button className="btn btn-sm btn-primary"
                                    onClick={() => this.props.switchView('add')}>Create New
                            </button>
                        </div>
                    </div>
                    <table className="table table-sm table-stripped table-hover">
                        <thead className="bg-light">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Comments</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.payments.map(item => {
                            return <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.comments}</td>
                                <td>
                                    <div className="d-flex justify-content-end">
                                        <button type="button" className="btn btn-sm btn-danger" onClick={() => {
                                            this.delete(item.id)
                                        }}>Delete
                                        </button>
                                        <button type="button" className="btn btn-sm btn-secondary ml-2" onClick={() => {
                                            this.props.switchView('view', item.id)
                                        }}>View
                                        </button>
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

export default BatchList;