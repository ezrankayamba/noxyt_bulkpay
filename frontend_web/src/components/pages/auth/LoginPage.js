import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import {login, logout} from "../../../redux/auth/actions";
import {connect} from "react-redux";

@connect((state) => {
    return {
        user: state.auth.user,
        loggedIn: state.auth.loggedIn
    }
}, {
    login: login,
    logout: logout
})
class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({submitted: true});
        const {username, password} = this.state;
        if (username && password) {
            this.props.login({username, password, history: this.props.history}, (res) => {
                console.log("Login response: ", res)
                if (res) {
                    // this.props.history.push("/")
                }
            });
        }
    }

    render() {
        const {username, password} = this.state;
        const {loggedIn} = this.props

        if (loggedIn) {
            return (
                <Redirect to="/"/>
            )
        }
        return (
            <div className="row">
                <div className="col-md-6 col-md-offset-3">
                    <form name="form" onSubmit={this.handleSubmit}>
                        <legend>Login</legend>
                        <div className={'form-group'}>
                            <label htmlFor="username">Username</label>
                            <input type="text" className="form-control" name="username" value={username}
                                   onChange={this.handleChange}/>
                        </div>
                        <div className={'form-group'}>
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" name="password" value={password}
                                   onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary btn-sm">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default LoginPage