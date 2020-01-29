import React, {Component} from 'react';
import {Link, Route, Switch} from "react-router-dom";
import getMenus from "./menus";
import {connect} from "react-redux";
import HomePage from "./pages/HomePage";

@connect((state) => {
    return {
        loggedIn: state.auth.loggedIn
    }
})
class Pages extends Component {
    render() {
        let menus = getMenus(this.props.loggedIn)
        return (
            <Switch>
                {menus.map(item => {
                    return <Route key={item.id} exact path={item.path} component={item.component}/>
                })}
                <Route component={HomePage}/>
            </Switch>
        );
    }
}

export default Pages;