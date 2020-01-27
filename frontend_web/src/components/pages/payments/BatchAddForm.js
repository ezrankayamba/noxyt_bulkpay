import React, {Component} from 'react';
import {connect} from "react-redux";
import {createPath} from "history";
import {createBatch} from "../../../_services/PaymentsService";

@connect((state) => {
    return {
        user: state.auth.user
    }
})
class BatchAddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            comments: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.doAddBatch = this.doAddBatch.bind(this)
    }
    handleChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    doAddBatch(e) {
        e.preventDefault()
        let body = {name: this.state.name, comments: this.state.comments}
        createBatch(this.props.user.token, body, (res) => {
            if (res) {
                this.props.switchView('list')
            }
        })
    };
    render() {
        return (
            <div className="row mb-2 mt-2">
                <form onSubmit={this.doAddBatch} className="bg-light col-md-6 offset-md-3 pt-2 pb-2">
                    <h5 className="text-primary">Add new batch</h5>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input name="name" className="form-control" id="name" value={this.state.name}
                               onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="comments">Comments</label>
                        <input name="comments" className="form-control" id="comments" value={this.state.comments}
                               onChange={this.handleChange}/>
                    </div>
                    <button type="submit" className="btn btn-sm btn-primary">Submit</button>
                    <button type="button" className="btn btn-sm btn-warning ml-2" onClick={() => {
                        this.props.switchView('list')
                    }}>Cancel
                    </button>
                </form>
            </div>
        );
    }
}

export default BatchAddForm;