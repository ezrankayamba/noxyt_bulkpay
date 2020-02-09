import React, {Component} from 'react';
import Modal from "../../modal/Modal";

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
        return (
            <Modal title={title} handleClose={() => {
                this.props.complete(false)
            }} show={open}
                   children={<form autoComplete="off"
                                   className="mb-2">
                <textarea className="form-control" onChange={this.handleChange.bind(this)}
                          name="comments" placeholder="Enter batch comments" width={100} required/>
                       <div className="pt-3">
                           <input type="file" className="form-control" onChange={this.handleFileSelect.bind(this)}
                                  required/>
                       </div>
                   </form>}
                   footer={<div className="btn-group">
                       <button className="btn btn-outline-danger" onClick={() => complete(false)}>Cancel</button>
                       <button type="button" className="btn btn-outline-primary"
                               onClick={this.doSubmit.bind(this)}>Submit
                       </button>
                   </div>}
            />
        );
    }
}

export default ManualEntryForm;