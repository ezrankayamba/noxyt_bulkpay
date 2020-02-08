import React, {Component} from 'react';
import Modal from "../../model/Modal";

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
        const {comments} = this.state
        const title = "File Upload"
        return (
            <Modal title={title} handleClose={() => {
                this.props.complete(false)
            }} show={open} children={<form noValidate autoComplete="off" className="mb-2">
                <textarea class="form-control"  onChange={this.handleChange.bind(this)}
                           name="comments" placeholder="Enter batch comments" width={100}/>
                <div className="pt-3">
                    <input type="file" class="form-control"  onChange={this.handleFileSelect.bind(this)}/>
                </div>
            </form>}
                   footer={<div className="btn-group">
                       <button className="btn btn-outline-danger" onClick={() => complete(false)}>Cancel</button>
                       <button className="btn btn-outline-primary" onClick={this.doSubmit.bind(this)}>Submit</button>
                   </div>}/>
        );
    }
}

export default ManualEntryForm;