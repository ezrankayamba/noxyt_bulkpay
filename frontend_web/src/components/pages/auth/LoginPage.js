import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import {login, logout} from "../../../redux/auth/actions";
import {connect} from "react-redux";
import CommonForm from "../../utils/CommonForm";

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
    }

    submitLogin({username, password}) {
        this.props.login({username, password, history: this.props.history}, (res) => {
        });
    }

    render() {
        const {loggedIn} = this.props
        let form = {
            title: "Login Form",
            fields: [
                {
                    name: 'username', label: "Username", validator: {
                        valid: (val) => val ? val.length >= 5 : false,
                        error: "Username should be at least 5 characters"
                    }
                },
                {name: 'password', label: "Password", type: "password"},
            ],
            onSubmit: this.submitLogin.bind(this)
        }

        if (loggedIn) {
            return (
                <Redirect to="/"/>
            )
        }
        return (
            <div className="row mt-3">
                <div className="col-md-6 offset-md-3"><CommonForm meta={form}/></div>
            </div>
        );
    }
}

export default LoginPage
