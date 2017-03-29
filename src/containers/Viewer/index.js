import React, { Component } from 'react';
import DOMPurify from 'dompurify';

import './style.css';
import article from '../../data/article';

class Viewer extends Component {
  render() {
    const articleHtml = {
      __html: DOMPurify.sanitize(article.content)
    };

    return (
      <div className="Viewer">
        <div className="viewer-title">
          {article.title}
        </div>
        <div className="viewer-author">
          by {article.author}
        </div>
        <div
          className="viewer-content"
          dangerouslySetInnerHTML={articleHtml}>
        </div>
      </div>
    );
  }
}

export default Viewer;
