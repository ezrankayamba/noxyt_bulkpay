import React, {Component} from 'react';
import {connect} from "react-redux";

@connect((state) => {
    return {
        user: state.users.user
    }
})
class ProtectedPage extends Component {
    render() {
        const {user} = this.props
        console.log("User: ", user)
        return (
            <div>
                <h5>Protected page</h5>
                <p>Logged in as: {user.username}</p>
            </div>
        );
    }
}

export default ProtectedPage;