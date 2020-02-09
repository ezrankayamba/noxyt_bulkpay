import React, {Component} from 'react';
import Modal from "../../modal/Modal";
import CrudTable from "../../ui-utils/CrudTable";

class ManualEntryForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            records: [],
            id: 0,
            name: "ManualEntry",
            comments: ""
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    doDeleteSelected(params) {
        params.cb()
    }

    doUpdate(params) {
        let {records} = this.state
        let record = {...params}
        // delete record.cb
        this.setState({
            records: records.map(r1 => [record].find(r2 => r2.id === r1.id) || r1)
        }, () => {
            console.log(record, this.state)
            // params.cb()
        })
    }

    doDelete(params) {
        console.log(params)
        this.setState({records: this.state.records.filter(r => r.id !== params.id)})
    }

    onAdd(params) {
        let {id} = this.state
        id++
        let record = {
            id: id,
            ...params
        }
        delete record.cb
        this.setState({
            id: id, records: [...this.state.records, record]
        }, () => {
            console.log(record, this.state)
            // params.cb()
        })
    }

    doSubmit() {
        let batch = {
            name: this.state.name,
            comments: this.state.comments,
            records: this.state.records
        }
        console.log(batch)
        this.props.complete(batch)
    }

    render() {
        let data = {
            records: this.state.records,
            headers: [
                {field: 'account', title: 'MSISDN'},
                {field: 'amount', title: 'Amount'},
                {field: 'reason', title: 'Reason'},
                {
                    field: 'actions',
                    title: '',
                    render: (row) => <button onClick={() => this.doDelete(row)}>Delete</button>
                },
            ],
            title: null,
            exportable: false
        }
        const {open, complete} = this.props
        let tableOptions = {
            actionsColumnIndex: data.headers.length
        }
        return (
            <Modal modalId="manualEntry" show={open} handleClose={() => complete(false)} title="Manual Entry"
                   children={<CrudTable columns={data.headers} data={data.records}
                                        onDeleteAll={this.doDeleteSelected.bind(this)}
                                        onUpdate={this.doUpdate.bind(this)}
                                        onDelete={this.doDelete.bind(this)}
                                        onAdd={this.onAdd.bind(this)}
                                        options={tableOptions}/>}
                   footer={<div className="btn-group">
                       <button className="btn btn-outline-danger" onClick={() => complete(false)}>Cancel</button>
                       <button className="btn btn-outline-primary" onClick={this.doSubmit.bind(this)}>Submit</button>
                   </div>}
            />
        );
    }
}

export default ManualEntryForm;