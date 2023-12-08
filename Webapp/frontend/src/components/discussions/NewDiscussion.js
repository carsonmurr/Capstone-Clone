import React, { Component , Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createDiscussion } from '../../actions/discussion';
export class NewDiscussion extends Component {
    state = {
        title: '',
        participants: [],
        message: '',
    };

    static PropTypes = {
        createDiscussion: PropTypes.func.isRequired,
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onSubmit = (e) => {
        e.preventDefault()
        this.props.createDiscussion(this.state);
    };

    render(){
        return(
            <form className='col'>
                <div className="mb-3">
                    <label className="form-label">Discussion Title</label>
                    <input className="form-control" id="title" aria-describedby="emailHelp" autocomplete="title"/>
                </div>
                <div class="form-group">
                    <label for="exampleFormControlSelect1">Example select</label>
                    <select class="form-control" id="participants">
                        <option>1</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Initial Message</label>
                    <div className='row'>
                        <textarea className="form-control" id="message" rows="3" autocomplete="message"></textarea>
                        <button className="btn btn-outline-secondary" type="submit" id="button-addon1">Send</button>
                    </div>
                </div>
            </form>
        );
    }
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {createDiscussion})(NewDiscussion);