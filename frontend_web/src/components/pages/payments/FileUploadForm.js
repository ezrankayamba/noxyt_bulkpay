import React, {Component} from 'react';
import Modal from "../../modal/Modal";
import {File} from "../../utils/file/File";

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
        this.handleFileSelect = this.handleFileSelect.bind(this)
    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    doSubmit(e) {
        if (this.state.name && this.state.comments) {
            let batch = new FormData()
            batch.append("name", this.state.name)
            batch.append("comments", this.state.comments)
            batch.append("file", this.state.file)
            this.props.complete(batch)
        } else {
            console.log("Invalid data")
        }
    }

    handleFileSelect(e) {
        let file = e.target.files[0]
        this.setState({file: file, name: file.name}, () => {
            console.log("State: ", this.state)
        })
    }

    render() {
        const {open, complete} = this.props
        const title = "File Upload"
        const media = ".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        return (
            <Modal modalId="fileUpload" title={title} handleClose={() => complete(false)} show={open}
                   content={
                       <form autoComplete="off" className="mb-2">
                           <textarea className="form-control" onChange={this.handleChange.bind(this)} name="comments"
                                     placeholder="Enter batch comments" required/>
                           <div className="pt-3">
                               <File onChange={this.handleFileSelect} name="image" label="Select batch file(csv, excel)"
                                     file={this.state.file} media={media}/>
                           </div>
                       </form>} footer={
                <div className="btn-group">
                    <button className="btn btn-sm btn-outline-danger" onClick={() => complete(false)}>Cancel</button>
                    <button type="button" className="btn btn-sm btn-outline-primary"
                            onClick={this.doSubmit.bind(this)}>Submit
                    </button>
                </div>}
            />
        );
    }
}

export default ManualEntryForm;
