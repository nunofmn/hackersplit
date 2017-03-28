import React from 'react';
import DOMPurify from 'dompurify';

import './style.css';

const CommentItem = ({content, author, subComments}) => {
  const contentHtml =  { __html: DOMPurify.sanitize(content) };

  return (
    <li className="commentItem">
      <div className="comment-author">{author}</div>
      <div className="comment-content" dangerouslySetInnerHTML={contentHtml}></div>
    <div className="comment-sub-size">• View {subComments.length} subcomments •</div>
    </li>
  );
}

export default CommentItem;
