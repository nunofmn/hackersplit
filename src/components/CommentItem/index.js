import React from 'react';
import DOMPurify from 'dompurify';

import './style.css';
import CommentList from '../CommentList/index';

const CommentItem = ({comment}) => {
  const { by, text } = comment;

  const comments = 'comments' in comment ? comment.comments : [];
  const contentHtml =  { __html: DOMPurify.sanitize(text) };

  return (
    <li className="commentItem">
      <div className="comment-author">{by}</div>
      <div className="comment-content" dangerouslySetInnerHTML={contentHtml}></div>
      <CommentList comments={comments} />
    </li>
  );
}

export default CommentItem;
