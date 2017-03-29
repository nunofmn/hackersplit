import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as StoryActions from '../../ducks/stories';

import StoryList from '../../components/StoryList/index';

class Stories extends Component {

  componentDidMount() {
    this.props.actions.fetchTopStories();
  }

  render() {
    const { stories } = this.props;
    return (
      <div className="Story">
        <StoryList stories={stories.items} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    stories: state.stories
  }
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(StoryActions, dispatch)
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Stories);
