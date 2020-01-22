import React, {Component} from 'react';
import {Link, Route, Switch} from "react-router-dom";
import HomePage from "./HomePage";
import NotFoundPage from "./NotFoundPage";
import getMenus from "./menus";
import {PrivateRoute} from "../PrivateRoute";

class Pages extends Component {
    logout() {
        console.log("Logout...")
    }

    render() {
        return (
            <Switch>
                {getMenus().map(item => {
                    return item.isPrivate
                        ? (<PrivateRoute key={item.id} exact path={item.path} component={item.component}/>)
                        : item.isLogout
                            ? ("") : (
                                <Route key={item.id} exact path={item.path} component={item.component}/>)
                })}
                <Route component={NotFoundPage}/>
            </Switch>
        );
    }
}

export default Pages;