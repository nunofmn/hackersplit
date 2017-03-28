import React from 'react';

import './style.css';

const StoryItem = ({title, by}) => {
  return (
    <li className="storyItem">
      <div className="story-title">{title}</div>
      <div className="story-by">
        added by <span className="story-author">{by}</span>
      </div>
    </li>
  );
}

export default StoryItem;
