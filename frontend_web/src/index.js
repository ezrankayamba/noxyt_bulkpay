import React, {Component} from "react";
import ReactDOM from "react-dom";
import Header from "./header";
import {BrowserRouter as Router} from "react-router-dom";
import Pages from "./components/pages/pages";
import {connect, Provider} from 'react-redux'
import store from "./redux/store";

import {logout} from "./redux/users/actions";
import {notifyMe} from "./_helpers/notification";
import {SESSION_TIMEOUT_LOGOUT_AT, SESSION_TIMEOUT_WARNING_AT} from "./conf";

@connect((state) => {
    return {
        user: state.users.user,
        loggedIn: state.users.loggedIn
    }
}, {logout: logout})
class Index extends Component {
    constructor(props) {
        super(props);
        this.events = [
            "load",
            "click",
            "scroll",
            "keypress"
        ];

        this.warn = this.warn.bind(this);
        this.resetSessionTimeout = this.resetSessionTimeout.bind(this);

        for (let i in this.events) {
            window.addEventListener(this.events[i], this.resetSessionTimeout);
        }

        this.setSessionTimeout();
    }

    clearSessionTimeout() {
        if (this.warnTimeout) clearTimeout(this.warnTimeout);
        if (this.logoutTimeout) clearTimeout(this.logoutTimeout);
    }

    setSessionTimeout() {
        if (this.props.loggedIn) {
            this.warnTimeout = setTimeout(this.warn, SESSION_TIMEOUT_WARNING_AT);
            this.logoutTimeout = setTimeout(() => {
                this.props.logout()
                location.reload();
            }, SESSION_TIMEOUT_LOGOUT_AT);
            console.log("Timeout set")
        }
    }

    resetSessionTimeout() {
        this.clearSessionTimeout();
        this.setSessionTimeout();
    }

    warn() {
        notifyMe("You will be logged out automatically in 1 minute.")
    }

    destroy() {
        this.clearSessionTimeout();
        for (let i in this.events) {
            window.removeEventListener(this.events[i], this.resetSessionTimeout);
        }
    }

    render() {
        return (
            <Router>
                <div>
                    <Header/>
                    <div className="container">
                        <Pages/>
                    </div>
                </div>
            </Router>
        );
    }
}

const root = (
    <Provider store={store}>
        <Index/>
    </Provider>
);


ReactDOM.render(root, document.getElementById('app'));