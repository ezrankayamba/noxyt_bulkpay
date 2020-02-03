import {NavLink} from "react-router-dom";
import React, {Component} from 'react';
import getMenus from "./components/menus";
import {logout} from "./redux/auth/actions";
import {connect} from "react-redux";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";

@connect((state) => {
    return {
        loggedIn: state.auth.loggedIn,
        user: state.auth.user
    }
}, {logout: logout})
class Header extends Component {
    render() {
        let {loggedIn, user} = this.props

        let privileges = loggedIn && user && user.profile ? user.profile.role.privileges : []
        return (
            <div>
                {getMenus(loggedIn, privileges).map((item) => {
                    return (
                        <NavLink key={item.id} exact to={item.path} className="nav-link pl-0 text-secondary">
                            <ListItem button>
                                <ListItemIcon>
                                    {item.mIcon}
                                </ListItemIcon>
                                <ListItemText primary={item.name}/>
                            </ListItem>
                        </NavLink>
                    )
                })}
            </div>
        );
    }
}

export default Header