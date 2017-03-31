import React from 'react';

import './style.css';
import CommentItem from '../CommentItem/index';

const getSubComments = (comment) => {
  return ('kids' in comment) ? comment.kids : [];
};

const CommentList = ({comments}) => {
  return (
    <ul className="Comments">
      {comments.map((comment) => {
        return <CommentItem key={comment.id} author={comment.by} content={comment.text} subComments={getSubComments(comment)} />;
      })}
    </ul>
  );
}


export default CommentList;
