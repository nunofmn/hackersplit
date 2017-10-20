import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import isEmpty from 'lodash.isempty'

import * as CommentsActions from '../../ducks/comments'
import CommentList from '../../components/CommentList/index'

import './style.css'

class Comments extends Component {
  getSubComments (comment) {
    return ('kids' in comment) ? comment.kids : []
  }

  componentDidUpdate (prevProps) {
    const { currentStory, actions } = this.props

    if (currentStory !== '' && prevProps.currentStory !== currentStory) {
      actions.fetchStoryComments(currentStory)
    }
  }

  render () {
    const { comments } = this.props.comments

    return (
      <div className='CommentSection'>
        { !isEmpty(comments) ? <CommentList comments={comments} /> : null }
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    currentStory: state.stories.currentStory,
    comments: state.comments
  }
};

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(CommentsActions, dispatch)
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comments)
