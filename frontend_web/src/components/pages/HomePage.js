import React, {Component} from 'react';
import {connect} from "react-redux";

@connect((state) => {
    return {
        user: state.auth.user,
        loggedIn: state.auth.loggedIn
    }
})
class HomePage extends Component {
    onSubmit(data) {
        console.log("Submitted data: ", data)
    }

    render() {
        const {user, loggedIn} = this.props
        return (
            <div>
                <h5>Home Page</h5>
                {loggedIn && <p>You are logged in</p>}
                {!loggedIn && <p>You are not logged in</p>}
            </div>
        );
    }
}

export default HomePage;
