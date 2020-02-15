import React, {Component} from 'react';
import {Route, Switch, Redirect} from "react-router-dom";
import getMenus from "./menus";
import {connect} from "react-redux";

@connect((state) => {
    return {
        loggedIn: state.auth.loggedIn,
        user: state.auth.user
    }
})
class Pages extends Component {
    render() {
        const {loggedIn, user} = this.props
        let privileges = loggedIn && user && user.profile ? user.profile.role.privileges : []
        let menus = getMenus(this.props.loggedIn, privileges)
        return (
            <Switch>
                {menus.map(item => {
                    return <Route key={item.id} exact path={item.path} component={item.component}/>
                })}
                <Redirect to="/home"/>
            </Switch>
        );
    }
}

export default Pages;