import {NavLink} from "react-router-dom";
import React, {Component} from 'react';
import getMenus from "./components/menus";
import {logout} from "./redux/auth/actions";
import {connect} from "react-redux";

@connect((state) => {
    return {
        loggedIn: state.auth.loggedIn
    }
}, {logout: logout})
class Header extends Component {
    render() {
        let {loggedIn} = this.props
        return (
            <header className="app-bg-primary sticky-top">
                <nav className="container text-light navbar navbar-dark navbar-expand-md pt-0 pb-0">
                    <a href="#" className="navbar-brand">BULK PAYMENT</a>
                    <button
                        className="navbar-toggler"
                        data-toggle="collapse"
                        data-target="#navMenu"
                        aria-controls="navMenu"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                        id="menu-toggle-btn"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navMenu">
                        <ul className="navbar-nav ml-auto">
                            {getMenus(loggedIn).map(item => (
                                <li key={item.id} className="nav-item">
                                    <NavLink exact to={item.path} className="nav-link">{item.name}</NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                </nav>
            </header>
        );
    }
}

export default Header