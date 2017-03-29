import React from 'react';

import './style.css';
import StoryItem from '../StoryItem/index';

const StoryList = ({stories}) => {
  return (
    <ul className="Stories">
      {stories.map((story) => {
        return <StoryItem key={story.id} title={story.title} by={story.by}/>;
      })}
    </ul>
  );
}

export default StoryList;
