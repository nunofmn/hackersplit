import React from 'react';
import DOMPurify from 'dompurify';

import './style.css';

const ViewerContent = ({article}) => {

  const { author, title, content} = article;

  const articleHtml = {
    __html: DOMPurify.sanitize(content)
  };

  return (
    <div>
      <div className="viewer-title">
        {title}
      </div>
      <div className="viewer-author">
        by {author}
      </div>
      <div
        className="viewer-content"
        dangerouslySetInnerHTML={articleHtml}>
      </div>
    </div>
  );
}

export default ViewerContent;
