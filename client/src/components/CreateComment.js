import React, { useState } from 'react'
import axios from 'axios'

const CreateComment = ({ id }) => {
    const [comment, setComment] = useState('')
    const [loading, setLoading] = useState(false)

    const handleCommentSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        const commentData = { content: comment }

        try {
            const response = await axios.post(`http://localhost:4001/posts/${id}/comments`, commentData)

            if (response.status === 201) {
                setLoading(false)
                setComment('')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="container">
            <form onSubmit={handleCommentSubmit}>
                <input type="text" name="comment" className="form-control" placeholder="Enter text to make comments" value={comment} onChange={(e) => setComment(e.target.value)} />
                <button type="submit" disabled={loading} className="btn btn-secondary d-block mt-2">Make Comments</button>
            </form>
        </div>
    )
}

export default CreateComment
