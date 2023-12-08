import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

export class Dashboard extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired,
    };

    state = {
        allUsernames: [],
    };

    componentDidMount() {
        // Call the API to fetch all usernames
        fetch('/api/auth/all_usernames', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${this.props.auth.token}`,  // Make sure to include the authentication token
            },
        })
        .then(response => response.json())
        .then(data => this.setState({ allUsernames: data.usernames }))
        .catch(error => console.error('Error fetching usernames:', error));
    }

    render() {
        const { isAuthenticated, user } = this.props.auth;
        const { allUsernames } = this.state;

        return (
            <div className="pt-3">
                <h1>
                    Welcome back <strong>{user.username}</strong>.
                </h1>
                {/*
                <h2>All Usernames:</h2>
                <ul>
                    {allUsernames.map(username => (
                        <li key={username}>{username}</li>
                    ))}
                </ul>
                    */}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(Dashboard);
