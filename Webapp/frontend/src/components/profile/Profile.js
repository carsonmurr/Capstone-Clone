import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import './Profile.css'
import profileIcon from '../../images/profile.png'
import editIcon from '../../images/edit.png'
import Settings from "../settings/Settings";
import { HashRouter as Route } from "react-router-dom";
import { Link } from 'react-router-dom';

// Note as of 11/29/23 @ 11:14 PM:
// Need to implement data that is specific to each user
// Need to implement profile picture that is specific to each user
// Need to format user profile better

export class Profile extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
  };
  render() {
    const { isAuthenticated, user } = this.props.auth;
    return (
      <div className="pt-3">
        <div className="card"> 
          <h1>{user.first_name} {user.last_name}</h1>
          <img src={ profileIcon } width="100px"/>
          <p><strong>Job Title: </strong>Sales Manager</p>
          <p><strong>Supervising Manager: </strong>David Johnson</p>
          <p><strong>Office Location: </strong>B321</p>
          <p><strong>Department: </strong>Sales</p>
          <p><strong>Email: </strong>{user.email}</p>
          <p><strong>Phone Number: </strong>8031234567</p>
          {/* <button className="edit"><img src={ editIcon } width={30}/></button> */}
          <Link to='/settings'>
            <img src={editIcon} width={25} />
          </Link>
          {/* add functionality to edit button */}
          {/*           
          <p><button>Message {user.username} </button></p>
          <p><button>Schedule a meeting with {user.username} </button></p>
           */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Profile);