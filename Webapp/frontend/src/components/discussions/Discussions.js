import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getDiscussions, addDiscussion } from '../../actions/discussions';

const Discussions = ({ discussions, getDiscussions, addDiscussion, auth }) => {
  const [allUsernames, setAllUsernames] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [newDiscussionTitle, setNewDiscussionTitle] = useState('');

  useEffect(() => {
    getDiscussions();

    fetch('/api/auth/all_usernames', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${auth.token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        // Filter out the current user's username
        const filteredUsernames = data.usernames.filter(username => username !== auth.user.username);
        setAllUsernames(filteredUsernames);
      })
      .catch(error => console.error('Error fetching usernames:', error));
  }, [getDiscussions, auth.token, auth.user.username]);

  const handleUserChange = (e) => {
    setSelectedUser(e.target.value);
  };

  const handleTitleChange = (e) => {
    setNewDiscussionTitle(e.target.value);
  };

  const handleCreateDiscussion = () => {
    if (selectedUser && newDiscussionTitle) {
      const discussion = {
        title: newDiscussionTitle,
        users: [selectedUser],
      };
      addDiscussion(discussion);
      setNewDiscussionTitle('');
    }
  };

  return (
    <div>
      <h1>Discussions</h1>

      <div>
        <h2>Create a Discussion</h2>
        <div>
          <label>Select User:</label>
          <select value={selectedUser} onChange={handleUserChange}>
            <option value="" disabled>
              Select User
            </option>
            {allUsernames.map((username) => (
              <option key={username} value={username}>
                {username}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Discussion Title:</label>
          <input
            type="text"
            value={newDiscussionTitle}
            onChange={handleTitleChange}
          />
        </div>
        <button onClick={handleCreateDiscussion}>Create Discussion</button>
      </div>

      <h2>All Discussions</h2>
      <ul>
        {discussions.map((discussion) => (
          <li key={discussion.id}>{discussion.title}</li>
        ))}
      </ul>
    </div>
  );
};

Discussions.propTypes = {
  discussions: PropTypes.array.isRequired,
  getDiscussions: PropTypes.func.isRequired,
  addDiscussion: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  discussions: state.discussions.discussions,
  auth: state.auth,
});

export default connect(mapStateToProps, { getDiscussions, addDiscussion })(
  Discussions
);
