import React, {Component} from 'react';
import {getClient, updateClient} from "../../../_services/ClientsService";
import {connect} from "react-redux";

@connect((state) => {
    return {
        user: state.auth.user
    }
})
class ClientEditForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            account: '',
            loading: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.doUpdateClient = this.doUpdateClient.bind(this)
    }

    componentDidMount() {
        getClient(this.props.user.token, this.props.selectedId, (res) => {
            this.setState({name: res.name, account: res.account})
        })
    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    doUpdateClient(e) {
        e.preventDefault()
        let body = {id: this.props.selectedId, name: this.state.name, account: this.state.account}
        this.setState({loading: true}, () => {
            updateClient(this.props.user.token, body, this.props.selectedId, (res) => {
                this.setState({loading: false})
                if (res) {
                    this.props.switchView('list')
                }
            })
        })
    };

    render() {
        let {loading} = this.state
        return (
            <div className="row mb-2 mt-2">
                <form onSubmit={this.doUpdateClient} className="bg-light col-md-6 offset-md-3 pt-2 pb-2">
                    <h5 className="text-primary">Edit client</h5>
                    <input type="hidden" name="id" className="form-control" id="id" value={this.props.selectedId}
                           onChange={() => {
                           }}/>
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
                    <button type="submit" className="btn btn-sm btn-primary" disabled={loading}>{loading &&
                    <i className="fa fa-sync fa-spin"></i>}Submit
                    </button>
                    <button type="button" className="btn btn-sm btn-warning ml-2" onClick={() => {
                        this.props.switchView('list')
                    }}>Cancel
                    </button>
                </form>
            </div>
        );
    }
}

export default ClientEditForm;