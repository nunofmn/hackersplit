import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as StoryActions from '../../ducks/stories'

import StoryList from '../../components/StoryList/index'

class Stories extends Component {
  clickStory (storyId) {
    this.props.actions.selectStory(storyId)
  }

  componentDidMount () {
    this.props.actions.fetchTopStories()
  }

  render () {
    const { stories } = this.props
    return (
      <div className='Story'>
        <StoryList stories={stories.items} clickStory={this.clickStory.bind(this)} />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    stories: state.stories
  }
};

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(StoryActions, dispatch)
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Stories)
