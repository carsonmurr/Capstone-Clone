import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getDiscussions } from '../../actions/discussion';
import moment from 'moment';

const DiscussionsList = ({ discussions, getDiscussions }) => {
  useEffect(() => {
    getDiscussions();
  }, [getDiscussions]);

  return (
    <div className='col'>
      {discussions.map((discussion) => (
        <Link to={`/discussion/${discussion.id}`} key={discussion.id}>
          <div className="alert alert-light" role="alert">
            {discussion.title}
            <small className="text-muted center">
              Last Post: {discussion.last_message}
            </small>
            <small className="right">
              Created: {moment(discussion.created_at).format('MMMM DD, YYYY')}
            </small>
          </div>
        </Link>
      ))}
      <Link to='/newDiscussion'>
        <button className="btn btn-primary" type="button">New Discussion</button>
      </Link>
    </div>
  );
};

const mapStateToProps = (state) => ({
  discussions: state.discussions,
});

export default connect(mapStateToProps, { getDiscussions })(DiscussionsList);
