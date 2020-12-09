import React from 'react'

const Comments = ({ comments }) => {
    const renderComments = comments.map(comment => {
        let content

        if (comment.status === 'approved') {
            content = comment.content
        }

        if (comment.status === 'pending') {
            content = 'This comment is about to pending'
        }

        if (comment.status === 'rejected') {
            content = 'This comment is rejected'
        }

        return <li key={comment.id}>{content}</li>
    })

    return (
        <div className="comments">
            {comments && <small><em>{comments.length} Comments</em></small>}
            <ul>{renderComments}</ul>
        </div>
    )
}

export default Comments
