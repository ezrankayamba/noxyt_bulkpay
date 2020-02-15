import React, {Component} from 'react';
import Modal from "../../modal/Modal";
import CrudTable from "../../ui-utils/CrudTable";
import Icons from "../../ui-utils/Incons";

class ManualEntryForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            records: [],
            id: 0,
            name: "ManualEntry",
            comments: "",
            error: "",
            showAdd: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.newComplete = this.newComplete.bind(this)
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
        this.setState({
            records: records.map(r1 => [record].find(r2 => r2.id === r1.id) || r1)
        }, () => {
            console.log(record, this.state)
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
            error: "",
            id: id, records: [...this.state.records, record]
        }, () => {
            console.log(record, this.state)
            // params.cb()
        })
    }

    doSubmit() {
        if (this.state.records.length) {
            let batch = {
                name: this.state.name,
                comments: this.state.comments,
                records: this.state.records
            }
            console.log("Batch?",batch)
            this.props.complete(batch)
        } else {
            this.setState({error: "You must add at least one record"})
        }
    }

    newComplete(param) {
        this.props.complete(false);
        this.setState({openAdd: false})
    }

    render() {
        const {error, openAdd} = this.state
        let data = {
            records: this.state.records,
            headers: [
                {
                    field: 'account', title: 'MSISDN', validator: {
                        valid: (val) => RegExp("^(|255|0)\\d{9}$").test(val),
                        error: "Invalid phone number"
                    }
                },
                {
                    field: 'amount', title: 'Amount', validator: {
                        valid: (val) => RegExp("^\\d{1,10}$").test(val),
                        error: "Invalid amount"
                    }
                },
                {
                    field: 'reason', title: 'Reason', validator: {
                        valid: (val) => val && val.length,
                        error: "Reason can not be blank"
                    }
                },
                {
                    field: 'actions',
                    title: '',
                    render: (row) => <button className="btn text-danger float-right" onClick={() => this.doDelete(row)}>
                        <Icons.trash/></button>
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
            <Modal modalId="manualEntry" show={open} handleClose={() => this.newComplete(false)} title="Manual Entry"
                   content={<CrudTable tableId="manualEntryTable" columns={data.headers} data={data.records}
                                       onDeleteAll={this.doDeleteSelected.bind(this)}
                                       onUpdate={this.doUpdate.bind(this)}
                                       onDelete={this.doDelete.bind(this)}
                                       options={tableOptions}
                                       newRecord={
                                           {
                                               open: openAdd,
                                               onAdd: this.onAdd.bind(this),
                                               show: () => this.setState({openAdd: true}),
                                               hide: () => this.setState({openAdd: false})
                                           }
                                       }/>}
                   footer={<div className="btn-group">
                       <button className="btn btn-sm btn-outline-danger" onClick={() => complete(false)}>Cancel
                       </button>
                       <button className="btn btn-sm btn-outline-primary" onClick={this.doSubmit.bind(this)}>Submit
                       </button>
                   </div>}
                   error={error}
            />
        );
    }
}

export default ManualEntryForm;