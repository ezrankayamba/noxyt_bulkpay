import React, {Component} from 'react';
import Dashboard from "./dashboard/Dashboard";

class HomePage extends Component {
    render() {
        return (
            <div>
                <h5>Home Page</h5>
                <Dashboard/>
            </div>
        );
    }
}

export default HomePage;