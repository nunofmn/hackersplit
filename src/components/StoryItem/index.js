import React from 'react';

import './style.css';

const StoryItem = ({ title, by, id, onClick }) => {
  return (
    <li className="storyItem" onClick={() => { onClick(id)}}>
      <div className="story-title">{title}</div>
      <div className="story-by">
        added by <span className="story-author">{by}</span>
      </div>
    </li>
  );
}

export default StoryItem;
