import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Comments from './Comments'
import CreateComment from './CreateComment'
import Post from './Post'

const ShowPosts = () => {
    const [posts, setPosts] = useState({})

    const getAllPosts = async () => {
        try {
            const response = await axios.get('http://localhost:4002/posts')

            if (response.status === 200) {
                setPosts(response.data.posts)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllPosts()
    }, [])

    const renderPosts = Object.values(posts)

    return (
        <div className="showposts">
            <div className="container">
                {renderPosts.map(post => (
                    <div key={post.id} className="mt-2">
                        <Post title={post.title} />
                        <Comments comments={post.comments} />
                        <CreateComment id={post.id} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ShowPosts
