import React from 'react'

import './style.css'
import StoryItem from '../StoryItem/index'

const StoryList = ({stories, clickStory}) => {
  return (
    <ul className='Stories'>
      {stories.map((story) => {
        return (
          <StoryItem
            key={story.id}
            id={story.id}
            title={story.title}
            by={story.by}
            onClick={clickStory} />
        )
      })}
    </ul>
  )
}

export default StoryList
