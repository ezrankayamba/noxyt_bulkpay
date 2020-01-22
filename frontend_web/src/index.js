import React, {Component} from "react";
import ReactDOM from "react-dom";
import Header from "./header";
import { BrowserRouter as Router} from "react-router-dom";
import Pages from "./components/pages/pages";
import { Provider } from 'react-redux'
import store from "./redux/store";


const root = (
    <Provider store={store}>
        <Router>
            <div>
                <Header />
                <div className="container">
                    <Pages/>
                </div>
            </div>
        </Router>
    </Provider>
);


ReactDOM.render(root, document.getElementById('app'));