import React, { Component } from 'react';

import './style.css';
import StoryItem from '../StoryItem/index.js';
import data from '../../data/stories.json';

class Stories extends Component {
  render() {
    return (
      <div className="Story">
        <ul className="Stories">
          {data.map((story) => {
            return <StoryItem key={story.id} title={story.title} by={story.by}/>;
          })}
        </ul>
      </div>
    );
  }
}

export default Stories;
