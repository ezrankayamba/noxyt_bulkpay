import React, {Component} from 'react';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import {Dialog, DialogActions} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import BasicCrudView from "../../ui-utils/BasicCrudView";
import TextField from "@material-ui/core/TextField";

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
        delete record.cb
        this.setState({
            records: records.map(r1 => [record].find(r2 => r2.id === r1.id) || r1)
        }, () => {
            console.log(record, this.state)
            params.cb()
        })
    }

    doDelete(params) {
        params.cb()
    }

    onAdd(params) {
        let {id, records} = this.state
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
            params.cb()
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
            ],
            title: null,
            exportable: false
        }
        const {open, complete} = this.props
        const {comments} = this.state
        return (
            <Dialog open={open}>
                <DialogTitle>Manual Entry</DialogTitle>
                <DialogContent>
                    <form noValidate autoComplete="off" className="mb-2">
                        <TextField fullWidth={true}
                                   multiline={true} value={comments}
                                   onChange={this.handleChange.bind(this)}
                                   name="comments"
                                   rows="2" label="Comments"/>
                    </form>
                    <BasicCrudView data={data}
                                   onDeleteAll={this.doDeleteSelected.bind(this)}
                                   onUpdate={this.doUpdate.bind(this)}
                                   onDelete={this.doDelete.bind(this)}
                                   onAdd={this.onAdd.bind(this)}/>
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={() => complete(false)}>Cancel</Button>
                    <Button color="primary" onClick={this.doSubmit.bind(this)}>Submit</Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default ManualEntryForm;