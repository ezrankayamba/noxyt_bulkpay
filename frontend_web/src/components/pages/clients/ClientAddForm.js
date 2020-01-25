import React, {Component} from 'react';
import {connect} from "react-redux";
import {createClient} from "../../../_services/ClientsService";
@connect((state) => {
    return {
        user: state.auth.user
    }
})
class ClientAddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            account: '',
            selectedId: -1
        }
        this.handleChange = this.handleChange.bind(this)
        this.doAddClient = this.doAddClient.bind(this)
    }
    handleChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    doAddClient(e) {
        e.preventDefault()
        let body = {name: this.state.name, account: this.state.account}
        createClient(this.props.user.token, body, (res) => {
            if (res) {
                this.props.switchView('list')
            }
        })
    };
    render() {
        return (
            <div className="row mb-2 mt-2">
                <form onSubmit={this.doAddClient} className="bg-light col-md-6 offset-md-3 pt-2 pb-2">
                    <h5 className="text-primary">Add new client</h5>
                    <div className="form-group">
                        <label htmlFor="name">Client Name</label>
                        <input name="name" className="form-control" id="name" value={this.state.name}
                               onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="account">Account MSISDN</label>
                        <input name="account" className="form-control" id="account" value={this.state.account}
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

export default ClientAddForm;