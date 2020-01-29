import React, {Component} from 'react';
import {connect} from "react-redux";
import {createBatch, deleteBatch, deleteSelectedBatches, fetchBatches} from "../../../_services/PaymentsService";
import BasicCrudView from "../../ui-utils/BasicCrudView";

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
        this.doAdd = this.doAdd.bind(this)
        this.doDelete = this.doDelete.bind(this)
        this.doDeleteSelected = this.doDeleteSelected.bind(this)
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

    doDelete(params) {
        deleteBatch(this.props.user.token, params.id, (res) => {
            params.cb()
            this.refresh()
        })
    }

    doDeleteSelected(params) {
        deleteSelectedBatches(this.props.user.token, params.ids, (res) => {
            params.cb(res)
            this.refresh()
        })
    }

    doAdd(params) {
        let body = {name: params.name, comments: params.comments}
        createBatch(this.props.user.token, body, (res) => {
            params.cb()
            this.refresh()
        });
    }

    render() {
        let data = {
            records: this.state.payments,
            headers: [
                {field: 'name', title: 'Name'},
                {field: 'comments', title: 'Comments'},
            ],
            title: 'List of batches'
        }
        return (
            <div className="row">
                <div className="col">
                    <BasicCrudView data={data} onDeleteAll={this.doDeleteSelected}
                                   onUpdate={this.doUpdate} onDelete={this.doDelete} onAdd={this.doAdd}/>
                </div>
            </div>
        );
    }
}

export default BatchList;