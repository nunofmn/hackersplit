import React from 'react'

import './style.css'
import CommentItem from '../CommentItem/index'

const isDeleted = (comment) => {
  return 'deleted' in comment && comment.deleted
}

const CommentList = ({comments}) => {
  return (
    <ul className='Comments'>
      {comments.map((comment) => {
        return !isDeleted(comment) ? <CommentItem key={comment.id} comment={comment} /> : null
      })}
    </ul>
  )
}

export default CommentList
