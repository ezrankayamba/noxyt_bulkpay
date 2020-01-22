import React, {Component} from 'react';
import {NavLink, Redirect} from "react-router-dom";
import {logout} from "../../redux/users/actions";
import {connect} from "react-redux";

class LogoutPage extends Component {
    componentDidMount() {
        this.props.logout()
        location.reload();
    }

    render() {
        return (
            <Redirect to="/login" />
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
export default connect(mapStateToProps, mapDispatchToProps)(LogoutPage);