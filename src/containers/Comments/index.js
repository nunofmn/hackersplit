import React, { Component } from 'react';

import './style.css';
import CommentItem from '../../components/CommentItem/index.js';
import data from '../../data/comments';

class Comments extends Component {

  getSubComments(comment) {
    return ('kids' in comment) ? comment.kids : [];
  }

  render() {
    return (
      <div className="CommentSection">
        <ul className="Comments">
          {data.map((comment) => {
            return <CommentItem key={comment.id} author={comment.by} content={comment.text} subComments={this.getSubComments(comment)} />;
          })}
        </ul>
      </div>
    );
  }
}

export default Comments;
