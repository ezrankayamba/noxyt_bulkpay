import React, {Component} from 'react';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import {Dialog, DialogActions} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import readXlsxFile from 'read-excel-file'
import LinearProgress from "@material-ui/core/LinearProgress";

class ManualEntryForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            records: [],
            name: "",
            comments: "",
            file: null
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    doSubmit() {
        let batch = new FormData()
        batch.append("name", this.state.name)
        batch.append("comments", this.state.comments)
        batch.append("file", this.state.file)
        this.props.complete(batch)
    }

    handleFileSelect(e) {
        let file = e.target.files[0]
        console.log(file)

        this.setState({file: file, name: file.name}, () => {
            console.log("State: ", this.state)
        })
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
        const {comments, completed} = this.state
        return (
            <Dialog open={open} fullWidth={true}>
                <DialogTitle className="pb-0">File Upload</DialogTitle>
                <DialogContent>
                    <form noValidate autoComplete="off" className="mb-2">
                        <TextField fullWidth={true}
                                   multiline={true} value={comments}
                                   onChange={this.handleChange.bind(this)}
                                   name="comments" label="Comments" placeholder="Enter batch comments"/>
                        <div>
                            <TextField fullWidth={true} type="file"
                                       name="file" label="Batch file" placeholder="Select batch file"
                                       onChange={this.handleFileSelect.bind(this)}/>
                        </div>
                    </form>
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