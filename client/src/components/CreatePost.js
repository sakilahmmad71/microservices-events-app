import React, { useState } from 'react'
import axios from 'axios'

const CreatePost = () => {
    const [title, setTitle] = useState('')
    const [loading, setLoading] = useState(false)

    const handlePostSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        const requestData = { title: title }

        try {
            const response = await axios.post('http://localhost:4000/posts', requestData)

            if (response.status === 201) {
                setLoading(false)
                setTitle('')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="createpost">
            <div className="container">
                <h1>Create Posts Here</h1>
                <form onSubmit={handlePostSubmit}>
                    <input type="text" name="post" autoComplete="off" className="form-control" placeholder="Enter text to make posts" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <button type="submit" disabled={loading} className="btn btn-primary btn-block mt-2">Create Posts</button>
                </form>
            </div>
        </div>
    )
}

export default CreatePost
