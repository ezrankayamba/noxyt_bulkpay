import React, {Component} from 'react';
import {connect} from "react-redux";
import {logout} from "../../redux/auth/actions";

@connect((state) => {
    return {
        user: state.auth.user,
        loggedIn: state.auth.loggedIn
    }
}, {
    logout: logout
})
class ProtectedPage extends Component {

    render() {
        const {user} = this.props
        return (
            <div>
                <h5>Protected page</h5>
                <p>Logged in as: {user.username}</p>
            </div>
        );
    }
}

export default ProtectedPage;