import {NavLink} from "react-router-dom";
import React, {Component} from 'react';
import getMenus from "./components/pages/menus";
import {logout} from "./redux/users/actions";
import {connect} from "react-redux";


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menus: getMenus()
        };
        this.doLogout = this.doLogout.bind(this)
    }

    doLogout() {
        console.log("Do logout: ", this)
        this.props.logout()
        location.reload()
    }

    render() {

        return (
            <header className="app-bg-primary sticky-top">
                <nav className="container text-light navbar navbar-dark navbar-expand-md pt-0 pb-0">
                    <a href="#" className="navbar-brand">Tigo Pesa <span>Projects</span></a>
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
                            {this.state.menus.map(item => (
                                <li key={item.id} className="nav-link">
                                    {item.isLogout
                                        ? <a className="nav-link" href="" onClick={this.doLogout}>Logout</a>
                                        : <NavLink exact to={item.path} className="nav-link">{item.name}</NavLink>}
                                </li>
                            ))}
                        </ul>
                    </div>
                </nav>
            </header>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user,
        loggedIn: state.loggedIn,
    }
}

const mapDispatchToProps = {
    logout: logout
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);