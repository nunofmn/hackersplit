import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import isEmpty from 'lodash.isempty';

import * as ContentActions from '../../ducks/content';
import ViewerContent from '../../components/ViewerContent/index';

import './style.css';

class Viewer extends Component {

  render() {
    const { content } = this.props.content;

    return (
      <div className="Viewer">
        { !isEmpty(content) ? <ViewerContent content={content} /> : null }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    content: state.content
  };
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ContentActions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Viewer);
